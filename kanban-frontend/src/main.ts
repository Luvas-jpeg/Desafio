// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importe NgbModal

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Remova NgbModule se estiver aqui
    // NgbModule,
    // E adicione a linha abaixo:
    { provide: NgbModal, useClass: NgbModal } // Fornece NgbModal explicitamente
  ]
}).catch(err => console.error(err));