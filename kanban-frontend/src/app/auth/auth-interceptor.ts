// src/app/auth/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // <<--- VERIFIQUE O CAMINHO NOVAMENTE: ../auth.service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();

    // <<--- ESTES SÃO OS LOGS QUE PRECISAMOS VER NO CONSOLE!
    console.log('DEBUG: AuthInterceptor ativo para URL:', request.url);
    console.log('DEBUG: Token obtido pelo interceptor (do localStorage):', authToken);

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}` // <<--- ESPAÇO APÓS 'Bearer'
        }
      });
      console.log('DEBUG: Authorization header adicionado:', request.headers.get('Authorization'));
    } else {
      console.log('DEBUG: Nenhum token encontrado, Authorization header NÃO adicionado.');
    }

    return next.handle(request);
  }
}