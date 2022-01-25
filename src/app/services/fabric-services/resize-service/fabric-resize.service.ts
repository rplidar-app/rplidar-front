import { Injectable } from '@angular/core';
import { fromEvent, interval } from "rxjs";
import { debounce } from 'rxjs/operators';

import { AbstractFabricService } from "../../../abstract-classes/absctract-fabric-service/abstract-fabric-service";

@Injectable({
  providedIn: 'root'
})
export class FabricResizeService extends AbstractFabricService {

  private _eventsInterval: number = 100;

  constructor() { super(); }

  protected _bindEventHandlers() {
    fromEvent(window, 'resize').pipe(
      debounce(() => interval(this._eventsInterval))
    ).subscribe({
      next: () => {
        this._handleResize();
      }
    });
    this._handleResize();
  }

  private _handleResize() {
    this._canvas?.setHeight(window.innerHeight);
    this._canvas?.setWidth(window.innerWidth);
  }
}
