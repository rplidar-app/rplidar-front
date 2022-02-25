import { Component } from '@angular/core';
import {fabric} from "fabric";
import {WorkAreaService} from "./services/work-area-service/work-area.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'rplidar-front';

  constructor(private workAreaService: WorkAreaService) {
  }

  public canvasMounted: boolean = false;

  public onCanvasMounted(canvas: fabric.Canvas) {
    console.log('It works!');
    this.canvasMounted = true;
    this.workAreaService.init(canvas);
  }

  public onStartWorkAreaCreation() {
    this.workAreaService.startCreation();
  }
  public onDiscardWorkAreaCreation() {
    this.workAreaService.discardCreation();
  }
  public onApplyCreatedWorkArea() {
    this.workAreaService.applyCreatedWorkArea();
  }
}
