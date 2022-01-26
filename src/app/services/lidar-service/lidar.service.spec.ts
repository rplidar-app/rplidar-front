import { TestBed } from '@angular/core/testing';

import { LidarService } from './lidar.service';

describe('LidarService', () => {
  let service: LidarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LidarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
