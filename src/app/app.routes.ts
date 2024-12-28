import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { SingUpComponent } from './components/sign-up/sign-up.component';
import { loginGuard } from './guards/login.guard';
import { StoreComponent } from './components/store/store.component';
import { TransactionComponent } from './components/transaction/transaction.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],

  },
  

  {
    path: 'sign-up',
    component: SingUpComponent,
    canActivate: [loginGuard],
  },

  { path: 'dashboard/store/:id',
     component: StoreComponent 
    },

    {
      path: 'dashboard/store/:storeId/transaction/:transactionId',
      component: TransactionComponent, 
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
