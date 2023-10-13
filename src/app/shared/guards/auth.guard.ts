import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate() {
        //  if (Not Logged In) {
        //       this.router.navigateByUrl('/');
        //       return false;
        //   }

        //   if (Token Expired) {
        //       return this.xxx.getNewToken().then(token=>{xxx}.catch(() => {
        //           this.router.navigateByUrl('/');
        //           return false;
        //       });
        //   }

        return true;
    }
}
