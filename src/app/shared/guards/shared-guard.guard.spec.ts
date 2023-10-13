import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sharedGuardGuard } from './shared-guard.guard';

describe('sharedGuardGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => sharedGuardGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
