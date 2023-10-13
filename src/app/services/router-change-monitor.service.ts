import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RouterChangeMonitorService {
    previousPath = '';
    currentPath = '';

    constructor(private router: Router) {}

    setupRouterEvents() {
        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
            this.previousPath = this.currentPath;
            this.currentPath = (e as NavigationEnd).url;
        });
    }
}
