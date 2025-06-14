// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './app.html', // <<-- CORRIGIDO AQUI!
  styleUrl: './app.scss'   // <<-- CORRIGIDO AQUI!
})
export class AppComponent {
  title = 'kanban-frontend';

  constructor() {}
}