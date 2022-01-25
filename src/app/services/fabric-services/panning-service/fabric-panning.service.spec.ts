import { TestBed } from '@angular/core/testing';

import { FabricPanningService } from './fabric-panning.service';

describe('FabricPanningService', () => {
  let service: FabricPanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricPanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
