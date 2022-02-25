import { Injectable } from '@angular/core';
import { fabric } from "fabric";

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {

  private _canvas: fabric.Canvas | null = null;
  private _creationIsActive: boolean = false;
  private _points: {x: number, y: number}[] = [];
  private _view: fabric.Polyline | null = null;
  private _lineColor: string = '';
  private _areaColor: string = '';

  public get creationIsActive(): boolean {
    return this._creationIsActive;
  }

  constructor() { }

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
  }

  public startCreation() {
    this._bindEventHandlers();
    this._creationIsActive = true;
    console.log('startCreation from the work-area.service');
  }

  public discardCreation() {
    this._removeEventHandlers();
    this._creationIsActive = false;
    console.log('discardCreation from the work-area.service');
  }

  public applyCreatedWorkArea() {
    this._removeEventHandlers();
    this._creationIsActive = false;
    console.log('applyCreatedWorkArea from the work-area.service');
  }

  private _bindEventHandlers() {
    if(this._canvas === null) {
      return ;
    }
    this._canvas.on('mouse:down', this.__onCanvasMouseDown);
    this._canvas.on('mouse:move', this.__onCanvasMouseMove);
    this._canvas.on('mouse:up', this.__onCanvasMouseUp);
  }

  private _removeEventHandlers() {
    if(this._canvas === null) {
      return ;
    }
    // for(let eventHandler of this._canvas.__eventListeners['mouse:down']) {
    //   console.log(eventHandler);
    //   if(eventHandler.name === 'bound __onCanvasMouseDown') {
    //     console.log('i found this shit!')
    //   }
    // }
    this._canvas.off('mouse:down', this.__onCanvasMouseDown);
    this._canvas.off('mouse:move', this.__onCanvasMouseMove);
    this._canvas.off('mouse:up', this.__onCanvasMouseUp);
  }

  private __onCanvasMouseDown = (e: fabric.IEvent<Event>) => {
    console.log('__onCanvasMouseDown from the work-area.service');
  }

  private __onCanvasMouseMove = (e: fabric.IEvent<Event>) => {
    console.log('__onCanvasMouseMove from the work-area.service')
  }

  private __onCanvasMouseUp = (e: fabric.IEvent<Event>) => {
    console.log('__onCanvasMouseUp from the work-area.service')
  }

}
