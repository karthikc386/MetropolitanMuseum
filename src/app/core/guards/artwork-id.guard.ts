import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const artworkIdGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  return Number.isInteger(id) && id > 0 ? true : router.createUrlTree(['/not-found']);
};
