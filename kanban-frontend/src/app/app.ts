import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KanbanApiService } from'./kanban-api';
import { Board } from './models/board.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'kanban-frontend';
  boards: Board[] = [];

  constructor(private kanpanApi: KanbanApiService) {}

  ngOnInit(): void {
    this.kanpanApi.getBoards().subscribe({
      next: (data) => {
        this.boards = data;
        console.log('Boards carregados:', this.boards);
      },
      error: (error) =>{
        console.error('Erro ao carregar boards:')
      }    
    });
  }
}
