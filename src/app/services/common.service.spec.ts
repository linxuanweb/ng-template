import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
    let service: CommonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getName function should be work', (done) => {
        const res = service.getName(1, 'day');
        const res2 = service.getName(2, 'day');
        expect(res).toEqual('day');
        expect(res2).toEqual('days');

        done();
    });
});
