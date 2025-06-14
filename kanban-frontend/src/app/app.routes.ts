import { Routes } from "@angular/router";
import { BoardListComponent } from "./board-list/board-list";
import { LoginComponent } from "./login/login";
import { RegisterComponent } from "./register/register";
import { BoardDetailComponent } from "./board-detail/board-detail";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'boards', component: BoardListComponent },
  { path: 'board/:id', component: BoardDetailComponent }, // <<--- Nova rota para o detalhe do board
  { path: '**', redirectTo: '/login' }
];