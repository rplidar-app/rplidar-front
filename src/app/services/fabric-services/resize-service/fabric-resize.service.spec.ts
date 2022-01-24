import { TestBed } from '@angular/core/testing';

import { FabricResizeService } from './fabric-resize.service';

describe('FabricResizeService', () => {
  let service: FabricResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
