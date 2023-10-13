import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class ReuseService implements RouteReuseStrategy {
    static storedRouteHandles = new Map<string, DetachedRouteHandle>();

    // Used to determine whether the router needs to be stored when navigating
    from = '';
    to = '';

    // Used to determine whether to read the previously stored router when navigating
    reuseFrom = '';
    reuseTo = '';

    static removeRouteCache(url: string) {
        ReuseService.storedRouteHandles.delete(url);
    }

    shouldReuseRoute(from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot): boolean {
        if (from.routeConfig) {
            this.from = this.getPath(from);
        }
        if (to.routeConfig) {
            this.to = this.getPath(to);
        }

        return from.routeConfig === to.routeConfig && JSON.stringify(from.params) === JSON.stringify(to.params);
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // Judge if do store
        if (this.shouldStore()) {
            this.reuseFrom = this.to;
            this.reuseTo = this.from;
        }
        return this.shouldStore();
    }

    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        // Store router
        ReuseService.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.component) {
            return null;
        }

        if (this.from === this.reuseFrom && this.to === this.reuseTo) {
            // Read reused router
            return ReuseService.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
        } else {
            return null;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.reuseFrom && this.reuseTo && this.from && this.to) {
            return this.from === this.reuseFrom && this.to === this.reuseTo && ReuseService.storedRouteHandles.has(this.getPath(route));
        }

        return false;
    }

    private shouldStore() {
        return this.from === '/a' && this.to === '/b';
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        let path = '';
        let currentSnapshot: ActivatedRouteSnapshot | null = route;

        while (currentSnapshot) {
            if (currentSnapshot.url) {
                if (path) {
                    path = currentSnapshot.url.join('/') + '/' + path;
                } else {
                    path = currentSnapshot.url.join('/');
                }
            }
            currentSnapshot = currentSnapshot.parent;
        }
        return path;
    }
}
