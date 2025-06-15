// src/app/kanban-api.service.ts (Versão fornecida por você)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpHeaders é importado
import { Observable } from 'rxjs';

// Assuming your Board interface is defined
interface Board {
  // Define properties of a board
}

@Injectable({
  providedIn: 'root'
})
export class KanbanApiService {
  private apiUrl = 'http://localhost:3000'; // Ou seu URL base real da API

  constructor(private http: HttpClient /*, private authService: AuthService */) { } // authService está comentado

  getBoards(): Observable<Board[]> {
    // O código para obter o token e criar o cabeçalho 'Authorization' está COMENTADO
    // const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${authToken}` // Exemplo para autenticação de token Bearer
      // Add other headers if needed
    });

    return this.http.get<Board[]>(`${this.apiUrl}/board`, { headers });
  }

  createBoard(title: string): Observable<Board> {
      // O código para obter o token e criar o cabeçalho 'Authorization' também está COMENTADO
    // const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${authToken}` // Exemplo para autenticação de token Bearer
      'Content-Type': 'application/json' // Exemplo para envio de dados JSON
    });

    const body = { title: title };

    return this.http.post<Board>(`${this.apiUrl}/board`, body, { headers });
  }
}