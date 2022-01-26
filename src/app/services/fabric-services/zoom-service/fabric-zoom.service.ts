import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fabric} from "fabric";

import {AbstractFabricService} from "../../../abstract-classes/absctract-fabric-service/abstract-fabric-service";

@Injectable({
  providedIn: 'root'
})
export class FabricZoomService extends AbstractFabricService {

  private _maxZoomValue: number = 20;
  private _minZoomValue: number = .01;

  constructor() { super(); }


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

  protected _bindEventHandlers() {
    // this._canvas?.on('mouse:wheel', this.__onMouseWheel.bind(this));
    let canvasMouseWheelObservable = new Observable<fabric.IEvent<WheelEvent>>(subscriber => {
      const canvas = this._canvas;
      if(canvas === undefined) {
        subscriber.error('Canvas is undefined');
        return () => null;
      }
      const eventHandler = (e: fabric.IEvent<WheelEvent>) => subscriber.next(e);
      canvas.on('mouse:wheel', eventHandler);
      return () => {
        canvas.off(eventHandler);
      };
    });
    canvasMouseWheelObservable.subscribe(e => this.__onMouseWheel(e));
  }

  private __onMouseWheel(event: fabric.IEvent<WheelEvent>) {
    const wheelEvent: WheelEvent = event.e;
    const zoom = this._calculateZoom(wheelEvent.deltaY);
    this._canvas?.zoomToPoint({x: wheelEvent.offsetX, y: wheelEvent.offsetY}, zoom);
  }
}
