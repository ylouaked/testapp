import { CanActivateFn } from '@angular/router';

export const signupGuard: CanActivateFn = (route, state) => {
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
   
    
    window.location.href = '/dashboard'; 
    return false; 
  }

 
  
  return true;
  
  
};
