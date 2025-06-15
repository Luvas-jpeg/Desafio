
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { KanbanApiService } from '../kanban-api'; 
import { Board } from '../models/board.model';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification';

@Component({
  selector: 'app-board-list',
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss'
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];
  newBoardTitle: string ="";

  showEditBoardModal = false;
  editingBoard: Board | null = null;
  editedBoardTitle: string='';

  constructor(private kanbanApi: KanbanApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.kanbanApi.getBoards().subscribe({
      next: (data) => {
        this.boards = data;
        console.log('Boards carregados (BoardList):', this.boards);
      },
      error: (error) => {
        console.error('Erro ao carregar boards (BoardList):', error);
      }
    });
  }

  createBoard(): void {
    if (this.newBoardTitle.trim()){
      this.kanbanApi.createBoard(this.newBoardTitle).subscribe({
        next: (newBoard) => {
          console.log('Board criado:', newBoard);
          this.newBoardTitle = '';
          this.getBoards();
          this.notificationService.success("Quadro com sucesso!");
        },
        error: (error) => {
          console.error('Erro ao criar board:', error);
          this.notificationService.error("Erro ao criar o quadro!")
        }
      });
    } else {
      alert('Por favor, insira um título para o novo quadro.')
    }
  }

  openEditBoardModal(board: Board): void {
    this.editingBoard = {...board};
    this.editedBoardTitle = board.title;
    this.showEditBoardModal = true;
  }

  closeEditBoardModal(): void {
    this.showEditBoardModal = false;
    this.editingBoard = null;
    this.editedBoardTitle = "";
  }

  saveEditedBoard(): void {
    if (this.editingBoard && this.editedBoardTitle.trim()) {
      this.kanbanApi.updateBoard(this.editingBoard.id, {title: this.editedBoardTitle}).subscribe({
        next: (updateBoard) => {
          console.log('Board editado:', updateBoard);
          this.closeEditBoardModal();
          this.getBoards();
          this.notificationService.success("Quador criado com sucesso!")
        },
          error: (error) => {
          console.error("erro ao editar board", error);
          this.notificationService.error("Erro ao editar board:", error)
        }
      });
    } else{
      alert("Por favor, insira um título válido.")
    }
  }

  deleteBoard(boardId: number): void {
    if (confirm("Tem certeza que deseja excluir este quadro? Todas as colunas e cards seram excluidos!")) {
      this.kanbanApi.removeBoard(boardId).subscribe({
        next: () => {
        console.log("Board excluido", boardId);
        this.getBoards();
        this.notificationService.success("Quadro excluido com sucesso!");
        
      },
      error: (error) => {
        this.notificationService.error("Erro ao deletar o quadro!")
        alert("Erro ao excluir quadro")
      }
    });
  }
 }
}