// src/app/kanban-api.ts (ou kanban-api.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importante: Http CLient
import { Observable } from 'rxjs'; // Para trabalhar com observables
import { Board } from './models/board.model'; // Importe os modelos que você criou
import { Column } from './models/column.model';
import { Card } from './models/card.model';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class KanbanApiService {
  private apiUrl = 'http://localhost:3000'; // <<--- URL do seu backend NestJS

  constructor(private http: HttpClient) { }

  // --- Métodos para Boards ---
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/board`);
  }

  createBoard(title: string): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/board`, { title });
  }

  // --- Métodos para Columns ---
  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`<span class="math-inline">\{this\.apiUrl\}/column/board/</span>{boardId}`);
  }

  createColumn(boardId: number, title: string, order: number): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/column`, { boardId, title, order });
  }

  // --- Métodos para Cards ---
  getCardsByColumn(columnId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`<span class="math-inline">\{this\.apiUrl\}/card/column/</span>{columnId}`);
  }

  createCard(columnId: number, title: string, description: string, order: number): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/card`, { columnId, title, description, order });
  }

  // Métodos de update e delete serão adicionados depois
}