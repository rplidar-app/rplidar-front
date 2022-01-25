import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {FabricResizeService} from "../../services/fabric-services/resize-service/fabric-resize.service";
import {FabricZoomService} from "../../services/fabric-services/zoom-service/fabric-zoom.service";
import {FabricPanningService} from "../../services/fabric-services/panning-service/fabric-panning.service";
import {fabric} from "fabric";

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.less']
})
export class FabricCanvasComponent implements OnInit, AfterViewInit {

  _canvas: fabric.Canvas | undefined = undefined;
  @ViewChild('canvas') private _canvasElement: ElementRef | undefined;

  constructor(
    private _fabricResizeService: FabricResizeService,
    private _fabricZoomService: FabricZoomService,
    private _fabricPanningService: FabricPanningService,
  ) { }

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
      });
      this._fabricResizeService.init(this._canvas);
      this._fabricZoomService.init(this._canvas);
      this._fabricPanningService.init(this._canvas);
      // this._canvas.add(new fabric.Circle({fill: 'red', radius: 10}));
    }
  }

}
