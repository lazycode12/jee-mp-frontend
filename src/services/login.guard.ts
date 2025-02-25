import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { map, take } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {

  const expectedRole = route.data['expectedRole'];
  const router = inject(Router);
  const authService = inject(AuthService);

  const role:string | null = authService.getToken('role');

  if(!role){
    router.navigate(['/login'])
  }

  if(expectedRole == role){
    return true
  }

  router.navigate(['/missing']);
  return false;

};
