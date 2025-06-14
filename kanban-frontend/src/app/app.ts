// src/app/app.ts (SEU ARQUIVO DO COMPONENTE RAIZ)
import { Component, OnInit } from '@angular/core'; // Adicione OnInit
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router'; // Adicione Router e RouterModule
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'; // Importe AuthService
import { Observable } from 'rxjs'; // Importe Observable

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    RouterModule // Necessário para usar [routerLink]
  ],
  templateUrl: './app.html', // <<-- Certifique-se de que seu HTML se chama 'app.html'
  styleUrl: './app.scss'   // <<-- Certifique-se de que seu SCSS se chama 'app.scss'
})
export class AppComponent implements OnInit {
  title = 'kanban-frontend'; // Título da sua aplicação (aparece na nav-bar)
  isAuthenticated$!: Observable<boolean>; // Propriedade para observar o estado de autenticação

  constructor(private authService: AuthService, private router: Router) {} // Injeta AuthService e Router

  ngOnInit(): void {
    // Ao iniciar o componente, subscreve-se ao estado de autenticação do AuthService
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  // Método chamado quando o botão "Sair" é clicado
  onLogout(): void {
    this.authService.logout(); // Chama o método de logout do AuthService
  }
}