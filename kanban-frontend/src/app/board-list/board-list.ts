
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { KanbanApiService } from '../kanban-api'; 
import { Board } from '../models/board.model';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-list',
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss'
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];
  newBoardTitle: string ="";

  constructor(private kanbanApi: KanbanApiService) {}

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
        },
        error: (error) => {
          console.error('Erro ao criar board:', error);
          alert('Erro ao criar quadro')
        }
      });
    } else {
      alert('Por favor, insira um título para o novo quadro.')
    }
  }
}