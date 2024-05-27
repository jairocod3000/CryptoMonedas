import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; 
import { LandingComponent } from './landing/landing.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MonedasComponent } from './monedas/monedas.component';
import { DetalleMonedaComponent } from './detalle-moneda/detalle-moneda.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Ruta de la página de inicio
  { path: 'login', component: LoginComponent }, // Ruta para la página de inicio de sesión
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] }, // Protegida con AuthGuard
  { path: 'monedas', component: MonedasComponent, canActivate: [AuthGuard] }, // Protegida con AuthGuard
  { path: 'detalle/:id', component: DetalleMonedaComponent, canActivate: [AuthGuard] }, // Protegida con AuthGuard
  { path: '**', redirectTo: '' } // Redireccionar cualquier ruta desconocida al LandingComponent
];
