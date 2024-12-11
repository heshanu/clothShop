import { TestBed } from '@angular/core/testing';

import { HomeCarouslService } from './home-carousl.service';

describe('HomeCarouslService', () => {
  let service: HomeCarouslService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeCarouslService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
