import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProfileGuard {
    constructor() {}

    canActivate() {
        // if (User Profile not Exist) {
        //     return false
        // }

        return true;
    }
}
