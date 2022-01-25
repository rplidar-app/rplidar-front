import { Injectable } from '@angular/core';
import { fabric } from "fabric";

@Injectable({
  providedIn: 'root'
})
export class FabricZoomService {

  private _canvas: fabric.Canvas | undefined = undefined;
  private _maxZoomValue: number = 20;
  private _minZoomValue: number = .01;

  constructor() { }

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._bindEventHandlers();
  }

  public zoom(delta: number) {
    this._canvas?.setZoom(this._calculateZoom(delta));
  }

  private _calculateZoom(delta: number) {
    const currentZoom = this._canvas?.getZoom();
    if(currentZoom === undefined) {
      return 1.;
    }
    let zoom = currentZoom*.999 ** delta;
    if(zoom > this._maxZoomValue) {
      zoom = this._maxZoomValue;
    } else {
      if(zoom < this._minZoomValue) {
        zoom = this._minZoomValue;
      }
    }
    return zoom;
  }

  private _bindEventHandlers() {
    this._canvas?.on('mouse:wheel', this.__onMouseWheel.bind(this));
  }

  private __onMouseWheel(event: fabric.IEvent) {
    const wheelEvent: WheelEvent = event.e as WheelEvent;
    const zoom = this._calculateZoom(wheelEvent.deltaY);
    this._canvas?.zoomToPoint({x: wheelEvent.offsetX, y: wheelEvent.offsetY}, zoom);
  }
}
