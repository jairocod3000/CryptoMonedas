import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class LoginComponent {
  name = '';
  registerEmail = '';
  signInEmail = '';
  signInPassword = '';    // Variable separada para la contraseña de inicio de sesión
  registerPassword = '';  // Variable separada para la contraseña de registro

  constructor(private authService: AuthService) {}

  signInWithEmail() {
    this.authService.signInWithEmail(this.signInEmail, this.signInPassword).then(() => {
      this.clearForm();
    }).catch(error => {
      console.error('Login Failed', error);
    });
  }

  registerWithEmail() {
    this.authService.registerWithEmail(this.registerEmail, this.registerPassword, this.name).then(() => {
      this.clearForm();
    }).catch(error => {
      console.error('Registration Failed', error);
    });
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      this.clearForm();
    }).catch(error => {
      console.error('Google Sign-In Failed', error);
    });
  }

  signInWithGitHub() {
    this.authService.signInWithGitHub().then(() => {
      this.clearForm();
    }).catch(error => {
      console.error('GitHub Sign-In Failed', error);
    });
  }

  clearForm() {
    // Limpiar todos los campos de formulario
    this.name = '';
    this.registerEmail = '';
    this.registerPassword = '';
    this.signInEmail = '';
    this.signInPassword = '';
  }
}
