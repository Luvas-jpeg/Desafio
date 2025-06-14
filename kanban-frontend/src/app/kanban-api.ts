
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
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/board`);
  }

  createBoard(title: string): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/board`, { title });
  }

  
  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/column`);
  }

  createColumn(boardId: number, title: string, order: number): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/column`, { boardId, title, order });
  }

  
  getCardsByColumn(columnId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/card`);
  }

  createCard(columnId: number, title: string, description: string, order: number): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/card`, { columnId, title, description, order });
  }
}