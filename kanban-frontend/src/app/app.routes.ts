// app.routes.ts
import { Routes } from "@angular/router";
import { BoardListComponent } from "./board-list/board-list";
import { LoginComponent } from "./login/login"; // Certifique-se que o caminho está correto
import { RegisterComponent } from "./register/register";
import { BoardDetailComponent } from "./board-detail/board-detail";

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, // ALTERADO: Agora renderiza LoginComponent diretamente
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Linha anterior, remova ou comente
  { path: 'login', component: LoginComponent }, // Mantenha esta rota também se você precisar navegar para /login explicitamente
  { path: 'register', component: RegisterComponent },
  { path: 'boards', component: BoardListComponent },
  { path: 'board/:id', component: BoardDetailComponent },
  { path: '**', redirectTo: '' } // ALTERADO: Redireciona para a rota raiz (agora o login) em caso de rota desconhecida
];