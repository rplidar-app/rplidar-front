import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-work-area-controller-view',
  templateUrl: './work-area-controller-view.component.html',
  styleUrls: ['./work-area-controller-view.component.less']
})
export class WorkAreaControllerViewComponent implements OnInit {

  constructor() { }

  @Output() startWorkAreaCreation: EventEmitter<undefined> = new EventEmitter<undefined>()
  @Output() discardWorkAreaCreation: EventEmitter<undefined> = new EventEmitter<undefined>()
  @Output() applyCreatedWorkArea: EventEmitter<undefined> = new EventEmitter<undefined>()

  public creationIsActive: boolean = false;

  ngOnInit(): void {
  }

  public onStartWorkAreaCreationButtonClicked() {
    this.creationIsActive = true;
    this.startWorkAreaCreation.emit();
  }
  public onDiscardWorkAreaCreationButtonClicked() {
    this.creationIsActive = false;
    this.discardWorkAreaCreation.emit();
  }
  public onApplyCreatedWorkAreaButtonClicked() {
    this.creationIsActive = false;
    this.applyCreatedWorkArea.emit();
  }

}
