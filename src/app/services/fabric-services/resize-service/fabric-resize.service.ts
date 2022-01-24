import { Injectable } from '@angular/core';
import { fabric } from "fabric";
import { fromEvent, interval } from "rxjs";
import { debounce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FabricResizeService {

  private _canvas: fabric.Canvas | undefined = undefined;
  private _eventsInterval: number = 100;

  constructor() { }

  init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._handleResize();
    fromEvent(window, 'resize').pipe(
      debounce(() => interval(this._eventsInterval))
    ).subscribe({
      next: () => {
        this._handleResize();
      }
    });
  }

  private _handleResize() {
    this._canvas?.setHeight(window.innerHeight);
    this._canvas?.setWidth(window.innerWidth);
  }
}
