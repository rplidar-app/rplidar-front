import { Injectable } from '@angular/core';
import { fabric } from "fabric";

import { AbstractFabricService } from "../../../abstract-classes/absctract-fabric-service/abstract-fabric-service";

@Injectable({
  providedIn: 'root'
})
export class FabricPanningService extends AbstractFabricService {

  private _panningIsActive: boolean = false;
  private _cursorPreviousPositionX: number = 0;
  private _cursorPreviousPositionY: number = 0;

  constructor() { super(); }

  protected _bindEventHandlers() {
    this._canvas?.on('mouse:down', this.__onMouseDown.bind(this));
    this._canvas?.on('mouse:move', this.__onMouseMove.bind(this));
    this._canvas?.on('mouse:up', this.__onMouseUp.bind(this));
  }

  private __onMouseDown(event: fabric.IEvent) {
    if(this._canvas === undefined || event.pointer === undefined) {
      return ;
    }
    const activeObjects = this._canvas.getActiveObjects();
    const mouseEvent = event.e as MouseEvent;
    if(activeObjects.length === 0) {
      if(!mouseEvent.altKey) {
        this._panningIsActive = true;
        this._canvas.selection = false;
        this._cursorPreviousPositionX = event.pointer.x;
        this._cursorPreviousPositionY = event.pointer.y;
      }
    }
  }
  private __onMouseMove(event: fabric.IEvent) {
    if(this._panningIsActive && this._canvas !== undefined && event.pointer !== undefined) {
      let vpt = this._canvas.viewportTransform;
      if(vpt === undefined) {
        this._panningIsActive = false;
        return ;
      }
      const x = event.pointer.x,
            y = event.pointer.y;
      vpt[4] += x - this._cursorPreviousPositionX;
      vpt[5] += y - this._cursorPreviousPositionY;
      this._cursorPreviousPositionX = x;
      this._cursorPreviousPositionY = y;
      this._canvas.requestRenderAll();
    }
  }
  private __onMouseUp(event: fabric.IEvent) {
    this._panningIsActive = false;
    if(this._canvas === undefined || event.pointer === undefined) {
      return ;
    }
    this._canvas.selection = true;
    if(this._canvas.viewportTransform === undefined) {
      return ;
    }
    this._canvas.setViewportTransform(this._canvas.viewportTransform);
  }

}
