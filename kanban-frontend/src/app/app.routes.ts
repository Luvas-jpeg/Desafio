// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BoardListComponent } from './board-list/board-list';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'boards', component: BoardListComponent },
  // { path: 'board/:id', component: BoardDetailComponent },
  { path: '**', redirectTo: '/login' }
];