import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';  // Asegúrate de importar Router
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  menuActive = false;

  constructor(public authService: AuthService, private router: Router) {} 

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  
  onSignOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);  // Redirige al login después del sign out
    }).catch(error => console.error(error));
  }
}

