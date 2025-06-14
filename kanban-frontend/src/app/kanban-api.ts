// src/app/kanban-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { Card } from './models/card.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanApiService {
  private apiUrl = 'http://localhost:3000'; // URL base do backend NestJS

  constructor(private http: HttpClient) { }

  // --- Métodos para Boards ---
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/board`);
  }

  createBoard(title: string): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/board`, { title });
  }

  // --- Métodos para Columns ---
  // <<--- AS SEGUNTES LINHAS DEVEM SER PERFEITAS, SEM NENHUM CARACTERE ESTRANHO --->>
  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/column/board/${boardId}`);
  }

  createColumn(boardId: number, title: string, order: number): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/column`, { boardId, title, order });
  }

  // --- Métodos para Cards ---
  // <<--- AS SEGUNTES LINHAS DEVEM SER PERFEITAS, SEM NENHUM CARACTERE ESTRANHO --->>
  getCardsByColumn(columnId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/card/column/${columnId}`);
  }

  createCard(columnId: number, title: string, description: string, order: number): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/card`, { columnId, title, description, order });
  }

  updateCard(id: number, data: Partial<Card>): Observable<Card> {
    return this.http.patch<Card>(`${this.apiUrl}/card/${id}`, data)
  }
}