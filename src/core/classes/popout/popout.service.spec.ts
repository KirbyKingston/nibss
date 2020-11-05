import { TestBed } from '@angular/core/testing';

import { PopoutService } from './popout.service';

describe('PopoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopoutService = TestBed.get(PopoutService);
    expect(service).toBeTruthy();
  });
});
