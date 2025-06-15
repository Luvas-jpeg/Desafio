// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa suas rotas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Fornece suas rotas para a aplicação
  ]
}).catch(err => console.error(err));