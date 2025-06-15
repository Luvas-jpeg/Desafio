// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Corrigido para .component
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa suas rotas
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Adicione esta linha para fornecer o HttpClient
  ]
}).catch(err => console.error(err));