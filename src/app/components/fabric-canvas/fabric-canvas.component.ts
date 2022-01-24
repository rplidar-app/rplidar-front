import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {FabricResizeService} from "../../services/fabric-services/resize-service/fabric-resize.service";
import {fabric} from "fabric";

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements OnInit, AfterViewInit {

  _canvas: fabric.Canvas | undefined = undefined;
  @ViewChild('canvas') private _canvasElement: ElementRef | undefined;

  constructor(private _fabricResizeService: FabricResizeService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._initFabric();
  }

  _initFabric() {
    if(this._canvasElement !== undefined) {
      this._canvas = new fabric.Canvas(this._canvasElement.nativeElement, {
        selection: true,
        controlsAboveOverlay: true,
        centeredScaling: true,
        allowTouchScrolling: true,
        preserveObjectStacking: false,
        backgroundColor: 'red',
      });
      this._fabricResizeService.init(this._canvas);
    }
  }

}
