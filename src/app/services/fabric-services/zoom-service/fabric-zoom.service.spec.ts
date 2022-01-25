import { TestBed } from '@angular/core/testing';

import { FabricZoomService } from './fabric-zoom.service';

describe('FabricZoomService', () => {
  let service: FabricZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
