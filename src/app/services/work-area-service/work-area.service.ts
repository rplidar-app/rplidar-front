import { Injectable } from '@angular/core';
import { fabric } from "fabric";

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {

  private _canvas: fabric.Canvas | null = null;
  private _creationIsActive: boolean = false;
  private _points: fabric.Point[] = [];
  private _view: fabric.Polyline | null = null;
  private _cursorView: fabric.Group | null = null;
  private _cursorSize: number = 70;
  private _lineColor: string = '#28A745';
  private _areaColor: string = '#28A74522';

  public get creationIsActive(): boolean {
    return this._creationIsActive;
  }

  constructor() { }

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._createWorkAreaView();
  }

  public startCreation() {
    this._bindEventHandlers();
    this._createCursor();
    this._creationIsActive = true;
    if(this._view) {
      if(this._view.points) {
        this._points = this._view.points;
        this._view.points = [];
        this._view.dirty = true;
      }
    }
    console.log('startCreation from the work-area.service');
  }

  public discardCreation() {
    this._removeEventHandlers();
    this._removeCursor();
    this._creationIsActive = false;
    if(this._view) {
      if(this._view.points) {
        this._view.points = this._points;
        this._points = [];
        this._view.dirty = true;
        this._canvas?.requestRenderAll();
      }
    }
    console.log('discardCreation from the work-area.service');
  }

  public applyCreatedWorkArea() {
    this._removeEventHandlers();
    this._removeCursor();
    this._creationIsActive = false;
    if(this._view) {
      if (this._view.points) {
        this._view.points.push(this._view.points[0]);
        this._view.dirty = true;
        this._canvas?.requestRenderAll();
      }
    }
    console.log('applyCreatedWorkArea from the work-area.service');
  }

  private _createCursor() {
    const params: fabric.ILineOptions = {
      stroke: '#00FFFF', fill: '#00FFFF', opacity: .75,
      originX: 'center', originY: 'center',
      strokeWidth: this._cursorSize/14,
    };
    const hLinePoints = [
      0, this._cursorSize/2,
      this._cursorSize, this._cursorSize/2,
    ];
    const vLinePoints = [
      this._cursorSize/2, 0,
      this._cursorSize/2, this._cursorSize,
    ]
    let hLine = new fabric.Line(hLinePoints, params);
    let vLine = new fabric.Line(vLinePoints, params);
    let circle = new fabric.Circle(params);
    circle.set({fill: '', strokeWidth: this._cursorSize/24, radius: this._cursorSize/2, originX: 'left', originY: 'top', stroke: '#F00'});
    circle.set({left: circle.strokeWidth? -circle.strokeWidth/2 : 0, top: circle.strokeWidth? -circle.strokeWidth/2 : 0,})
    this._cursorView = new fabric.Group([hLine, vLine, circle], {
      originX: 'center', originY: 'center', selectable: false, evented: false, hasControls: false, hasBorders: false
    });
    this._canvas?.add(this._cursorView);
  }

  private _removeCursor() {
    if(!this._canvas || !this._cursorView) {
      return ;
    }
    for(let obj of this._cursorView._objects) {
      this._cursorView.remove(obj);
    }
    this._canvas.remove(this._cursorView);
    this._cursorView = null;
  }

  private _createWorkAreaView() {
    if(!this._canvas) {
      return ;
    }
    if(this._view !== null) {
      this._canvas?.remove(this._view);
      this._view = null;
    }
    this._view = new fabric.Polyline([], {
      fill: this._areaColor, stroke: this._lineColor, strokeWidth: 10,
      selectable: false, evented: false, hasBorders: false, hasControls: false, objectCaching: false
    });
    this._canvas.add(this._view);
    this._canvas.requestRenderAll();
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

  private __onCanvasMouseDown = (event: fabric.IEvent<Event>) => {
    if(!this._view || !this._canvas) {
      return ;
    }
    const pointer = this._canvas.getPointer(event.e);
    this._view.points?.push(new fabric.Point(pointer.x, pointer.y));
    this._view._calcDimensions();
    this._view.dirty = true;
    this._view.setCoords();
    this._canvas.requestRenderAll();
    // console.log(this._view.points);
    // console.log('__onCanvasMouseDown from the work-area.service', event);
  }

  private __onCanvasMouseMove = (event: fabric.IEvent<Event>) => {
    if(!this._canvas || !this._cursorView) {
      return ;
    }
    const pointer = this._canvas.getPointer(event.e);
    this._cursorView.set({left: pointer.x, top: pointer.y});
    // console.log('__onCanvasMouseMove from the work-area.service', pointer);
  }

  private __onCanvasMouseUp = (event: fabric.IEvent<Event>) => {
    // console.log('__onCanvasMouseUp from the work-area.service', event);
  }

  private _sendPointsToBack() {}

}
