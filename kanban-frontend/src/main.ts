// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Importa o objeto de configuração
import { AppComponent } from './app/app'; // <<-- CORREÇÃO AQUI: adicione '.component'
import { provideRouter } from '@angular/router'; // Mantenha este import, mas ele está em app.config.ts
import { routes } from './app/app.routes'; // Mantenha este import, mas ele está em app.config.ts
// import { provideEnvironmentInitializer } from '@angular/core'; // Esta linha não é necessária para o projeto

bootstrapApplication(AppComponent, appConfig) // <<-- CORREÇÃO IMPORTANTE AQUI: PASSE appConfig!
  .catch((err) => console.error(err));