// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config'; // <<--- REMOVA ESTA LINHA
import { AppComponent } from './app/app'; // <<--- VERIFIQUE O NOME DO SEU ARQUIVO AppComponent (app.ts ou app.component.ts)
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
// Adicione os imports para HTTP_INTERCEPTORS e provideHttpClient (se já não estiverem)
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor'; // <<--- O CAMINHO DEVE ESTAR CORRETO AQUI


bootstrapApplication(AppComponent, { // <<--- PASSE OS PROVIDERS DIRETAMENTE
  providers: [
    provideRouter(routes), // Router agora aqui
    provideHttpClient(), // HttpClient agora aqui
    { // Interceptor agora aqui
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch((err) => console.error(err));