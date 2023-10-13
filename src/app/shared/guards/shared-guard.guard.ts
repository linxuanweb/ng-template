import { CanActivateFn } from '@angular/router';

export const sharedGuardGuard: CanActivateFn = (route, state) => {
    return true;
};
