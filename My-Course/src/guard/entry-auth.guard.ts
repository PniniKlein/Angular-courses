import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';

export const entryAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!sessionStorage.getItem('authToken')){
    router.navigate(['/Login']);
  }
  return true;
};
