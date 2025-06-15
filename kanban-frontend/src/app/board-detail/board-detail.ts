// src/app/board-detail/board-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { KanbanApiService } from '../kanban-api'; // <<--- VERIFICAR CAMINHO! (Deve ser .service)
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Card } from '../models/card.model';
import { User } from '../models/user.model'; // Importe o modelo User
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DragDropModule],
  templateUrl: './board-detail.html', // <<--- VERIFICAR NOME DO ARQUIVO HTML
  styleUrl: './board-detail.scss' // <<--- VERIFICAR NOME DO ARQUIVO SCSS
})
export class BoardDetailComponent implements OnInit {
  boardId!: number;
  boardTitle: string = 'Carregando...';
  columns: Column[] = [];

  showAddColumnForm = false;
  newColumnTitle: string = '';

  showAddCardFormForColumnId: number | null = null;
  newCardTitle: string = '';
  newCardDescription: string = '';

  boardMembers: User[] = []; // Propriedade para membros
  showMembersModal = false;
  newMemberEmail: string = '';
  memberInviteError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private kanbanApi: KanbanApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.boardId = +idParam;
          return this.kanbanApi.getBoards().pipe(
            tap(boards => {
              const currentBoard = boards.find(b => b.id === this.boardId);
              if (currentBoard) {
                this.boardTitle = currentBoard.title;
              } else {
                this.boardTitle = 'Quadro não encontrado';
              }
            }),
            switchMap(() => this.loadBoardData())
          );
        }
        throw new Error('Board ID not found in route parameters.');
      }),
      catchError(err => {
        console.error('Erro ao processar ID da rota ou carregar dados:', err);
        this.boardTitle = 'Erro ao carregar quadro';
        return of(null);
      })
    ).subscribe();
  }

  loadBoardData(): Observable<any> {
    return this.kanbanApi.getColumnsByBoard(this.boardId).pipe(
      tap(columnsData => {
        this.columns = columnsData;
        console.log('DEBUG: Colunas carregadas e atribuídas a this.columns:', this.columns);
        if (this.columns.length > 0) {
          const cardRequests = this.columns.map(column =>
            this.kanbanApi.getCardsByColumn(column.id).pipe(
              tap(cardsData => {
                column.cards = cardsData;
                console.log('DEBUG: Cartões carregados para coluna', column.title, ':', cardsData);
              })
            )
          );
          return forkJoin(cardRequests).pipe(catchError(err => {
            console.error('Erro ao carregar cartões:', err);
            return of(null);
          }));
        }
        return of(null);
      }),
      switchMap(val => val || of(null)),
      catchError(err => {
        console.error('Erro ao carregar colunas do quadro:', err);
        this.columns = [];
        return of(null);
      })
    ).pipe( // Adicione este pipe aqui para chamar loadMembers após carregar colunas/cartões
      tap(() => this.loadMembers())
    );
  }

  toggleAddColumnForm(): void {
    this.showAddColumnForm = !this.showAddColumnForm;
    if (!this.showAddColumnForm) {
      this.newColumnTitle = '';
    }
  }

  createColumn(): void {
    console.log('DEBUG: Método createColumn chamado!');
    if (this.newColumnTitle.trim() && this.boardId) {
      const newOrder = this.columns.length > 0 ? Math.max(...this.columns.map(c => c.order || 0)) + 1 : 1;

      this.kanbanApi.createColumn(this.boardId, this.newColumnTitle, newOrder).subscribe({
        next: (newColumn) => {
          console.log('Coluna criada:', newColumn);
          this.newColumnTitle = '';
          this.showAddColumnForm = false;
          this.loadBoardData().subscribe();
        },
        error: (error) => {
          console.error('Erro ao criar coluna:', error);
          alert('Erro ao criar coluna. Verifique o console.');
        }
      });
    } else {
      alert('Por favor, insira um título para a nova coluna.');
    }
  }

  toggleAddCardForm(columnId: number): void {
    console.log('DEBUG: Método toggleAddCardForm chamado para coluna ID:', columnId);
    this.showAddCardFormForColumnId = (this.showAddCardFormForColumnId === columnId) ? null : columnId;
    this.newCardTitle = '';
    this.newCardDescription = '';
  }

  createCard(column: Column): void {
    console.log('DEBUG: Método createCard chamado!');
    console.log('DEBUG: newCardTitle:', this.newCardTitle.trim());
    console.log('DEBUG: column.id', column.id);
    if (this.newCardTitle.trim() && column.id) {
      const newOrder = column.cards && column.cards.length > 0 ?
                       Math.max(...column.cards.map(c => c.order || 0)) + 1 : 1;

      this.kanbanApi.createCard(column.id, this.newCardTitle, this.newCardDescription, newOrder).subscribe({
        next: (newCard) => {
          console.log('Cartão criado:', newCard);
          this.newCardTitle = '';
          this.newCardDescription = '';
          this.showAddCardFormForColumnId = null;
          this.loadBoardData().subscribe();
        },
        error: (error) => {
          console.error('Erro ao criar cartão:', error);
          alert('Erro ao criar cartão. Verifique o console.');
        }
      });
    } else {
      alert('Por favor, insira um título para o novo cartão.');
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.updateCardOrderAndColumn(event.container.data, event.container.id);
  }

  updateCardOrderAndColumn(cards: Card[], columnId: string): void {
    const targetColumn = this.columns.find(col => col.id === +columnId);
    if (!targetColumn) {
      console.error('Coluna destino não encontrada!');
      return;
    }

    cards.forEach((card, index) => {
      card.order = index + 1;
      card.columnId = targetColumn.id;
    });

    const cardUpdateRequests = cards.map(card => {
      return this.kanbanApi.updateCard(card.id, {
        columnId: card.columnId,
        order: card.order,
        title: card.title,
        description: card.description
      }).pipe(
        catchError(err => {
          console.error(`Erro ao atualizar cartão ${card.id}:`, err);
          return of(null);
        })
      );
    });

    if (cardUpdateRequests.length > 0) {
      forkJoin(cardUpdateRequests).subscribe({
        next: () => {
          console.log('Ordem dos cartões e colunas atualizadas no backend!');
        },
        error: (err) => {
          console.error('Erro ao salvar as mudanças dos cartões:', err);
        }
      });
    }
  }

  // <<--- NOVOS MÉTODOS PARA MEMBROS DO BOARD
  loadMembers(): void {
    if (this.boardId) {
      this.kanbanApi.getBoardMembers(this.boardId).subscribe({
        next: (members) => {
          this.boardMembers = members;
          console.log('DEBUG: Membros do board carregados:', this.boardMembers);
        },
        error: (err) => {
          console.error('Erro ao carregar membros do board:', err);
        }
      });
    }
  }

  openMembersModal(): void {
    this.showMembersModal = true;
    this.newMemberEmail = '';
    this.memberInviteError = null;
  }

  closeMembersModal(): void {
    this.showMembersModal = false;
    this.newMemberEmail = '';
    this.memberInviteError = null;
  }

  inviteMember(): void {
    if (this.newMemberEmail.trim() && this.boardId) {
      this.memberInviteError = null;
      this.kanbanApi.addBoardMember(this.boardId, this.newMemberEmail).subscribe({
        next: (updatedBoard) => {
          console.log('Membro convidado com sucesso! Board atualizado:', updatedBoard);
          this.newMemberEmail = '';
          this.loadMembers();
          alert('Membro convidado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao convidar membro:', err);
          this.memberInviteError = err.error?.message || 'Erro ao convidar membro. Verifique o email.';
        }
      });
    } else {
      this.memberInviteError = 'Por favor, insira um email válido.';
    }
  }

  removeMember(userId: number): void {
    if (confirm('Tem certeza que deseja remover este membro do board?')) {
      this.kanbanApi.removeBoardMember(this.boardId, userId).subscribe({
        next: () => {
          console.log('Membro removido com sucesso!');
          this.loadMembers();
        },
        error: (err) => {
          console.error('Erro ao remover membro:', err);
          alert('Erro ao remover membro. Verifique o console.');
        }
      });
    }
  }
}