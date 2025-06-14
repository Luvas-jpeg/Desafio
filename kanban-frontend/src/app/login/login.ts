import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent{
  email='';
  password='';
  errorMessage: string | null = null;
  showPassword = false;

  constructor(private authService: AuthService,private router: Router) { }

  onLogin(): void {
    this.errorMessage = null;
    this.authService.signIn({email: this.email, password: this.password}).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/boards']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = error.error?.message || 'Credenciais invalidas'
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register'])
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
