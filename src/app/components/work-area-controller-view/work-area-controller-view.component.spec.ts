import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaControllerViewComponent } from './work-area-controller-view.component';

describe('WorkAreaControllerViewComponent', () => {
  let component: WorkAreaControllerViewComponent;
  let fixture: ComponentFixture<WorkAreaControllerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAreaControllerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAreaControllerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
