import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    window.location.href = '/dashboard'; // Redirect to /dashboard
    return false; // Prevent navigation to the current route
  }
  return true; 
};
