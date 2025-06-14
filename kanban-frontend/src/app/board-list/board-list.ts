
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { KanbanApiService } from '../kanban-api'; 
import { Board } from '../models/board.model';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-board-list',
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss'
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];

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
}