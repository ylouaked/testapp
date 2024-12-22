import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavbarComponent,  
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',   
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',     
        component: ProfileComponent,
        canActivate: [authGuard],
      }
    ]
  },
];
