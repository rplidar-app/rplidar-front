import { TestBed } from '@angular/core/testing';

import { ScansDrawingService } from './scans-drawing.service';

describe('ScansDrawingService', () => {
  let service: ScansDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScansDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
