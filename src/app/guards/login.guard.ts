import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
 
   if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
     router.navigate(['/dashboard']); 
     return false; 
   }
   return true;
   
 };
 ;
