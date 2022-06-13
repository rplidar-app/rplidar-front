import { fabric } from "fabric";
import { LidarPointInterface } from "../../../interfaces/lidar-interfaces/lidar-point-interface";

export class PointsGroupFabricView {

  private readonly _canvas: fabric.Canvas | null = null;
  private _model: LidarPointInterface[] = [];
  private _color: string = '#FFF';
  private _opacity: number = 1;
  private _bordered: boolean = false;
  private _coordinatesOfCenter: [number, number] | null = null;
  private _shouldDoRenderCall: boolean = true;

  private _view: fabric.Group | null = null;
  private _dots: fabric.Circle[] = [];
  private _borderRect: fabric.Rect | null = null;
  private _center: fabric.Circle | null = null;
  private _centralDot: fabric.Circle | null = null;

  private readonly _dotsBaseProps: fabric.ICircleOptions = {
    originX: 'center', originY: 'center', radius: 5, left: 0, top: 0, opacity: this._opacity, fill: this._color,
    stroke: '', strokeWidth: 0, evented: false, hasControls: false, hasBorders: false,
  };
  private readonly _viewBaseProps: fabric.IGroupOptions = {
    originX: 'left', originY: 'top', opacity: 1,
    evented: false, hasControls: false, hasBorders: false,
  };
  private readonly _borderRectBaseProps: fabric.IRectOptions = {
    originX: 'left', originY: 'top', opacity: 1, stroke: this._color, strokeWidth: 3, fill: '',
    evented: false, hasControls: false, hasBorders: false,
  };

  public set model(newValue: LidarPointInterface[]) {
    this._model = newValue;
    this._recreateView();
  }
  public set color(newValue: string) {
    this._color = newValue;
    this._recreateView();
  }
  public set opacity(newValue: number) {
    this._opacity = newValue;
    this._recreateView();
  }

  public set bordered(newValue: boolean) {
    this._bordered = newValue;
    this._recreateView();
  }

  public set shouldDoRenderCall(newValue: boolean) {
    this._shouldDoRenderCall = newValue;
  }

  constructor(canvas: fabric.Canvas,
              model: LidarPointInterface[],
              coordinatesOfCenter: [number, number] | null,
              color: string = '#FFF',
              opacity: number = 1,
              bordered: boolean = false,
              shouldDoRenderCall: boolean = true,) {
    this._canvas = canvas;
    this._model = model;
    this._coordinatesOfCenter = coordinatesOfCenter;
    this._color = color;
    this._opacity = opacity;
    this._bordered = bordered;
    this._shouldDoRenderCall = shouldDoRenderCall;
    this._createView();
  }

  private _createView() {
    if(!this._canvas || this._model.length === 0 || this._view) {
      return ;
    }
    let objectsToGroup: Array<fabric.Circle | fabric.Rect> = [];
    if(this._bordered) {
      this._createBorderRect();
      if(this._borderRect) {
        objectsToGroup.push(this._borderRect);
      }
    }
    // let i = 0;
    // for(let point of this._model) {
    //   let dot = new fabric.Circle(this._dotsBaseProps);
    //   dot.left = point[0];
    //   dot.top = point[1];
    //   dot.fill = i === 0 ? '#0F0' : this._color;
    //   dot.opacity = this._opacity;
    //   this._dots.push(dot);
    //   objectsToGroup.push(dot);
    //   i += 1;
    // }
    if(this._coordinatesOfCenter !== null) {
      this._center = new fabric.Circle(this._dotsBaseProps);
      this._center.left = this._coordinatesOfCenter[0];
      this._center.top = this._coordinatesOfCenter[1];
      this._center.radius = 48.5;
      this._center.fill = '#00000000';
      this._center.stroke = '#F0F';
      this._center.strokeWidth = 3;
      this._centralDot = new fabric.Circle(this._dotsBaseProps);
      this._centralDot.left = this._coordinatesOfCenter[0];
      this._centralDot.top = this._coordinatesOfCenter[1];
      objectsToGroup.push(this._center);
      objectsToGroup.push(this._centralDot);
    }
    this._view = new fabric.Group(objectsToGroup, this._viewBaseProps);
    this._view.stroke = this._color;
    this._canvas.add(this._view);
    this._render();
  }

  private _createBorderRect() {
    if(!this._canvas || this._model.length === 0) {
      return ;
    }
    const baseX = this._model[0][0], baseY = this._model[0][1];
    // @ts-ignore
    const margins: number = this._dotsBaseProps.radius + this._borderRectBaseProps.strokeWidth + 20;
    let minX = baseX, minY = baseY, maxX = baseX, maxY = baseY;
    for(let point of this._model) {
      minX = point[0] < minX ? point[0] : minX;
      minY = point[1] < minY ? point[1] : minY;
      maxX = point[0] > maxX ? point[0] : maxX;
      maxY = point[1] > maxY ? point[1] : maxY;
    }
    this._borderRect = new fabric.Rect(this._borderRectBaseProps);
    this._borderRect.stroke = this._color;
    this._borderRect.left = minX - margins;
    this._borderRect.top = minY - margins;
    this._borderRect.width = Math.abs(maxX - minX) + margins*2;
    this._borderRect.height = Math.abs(maxY - minY) + margins*2;
  }

  private _removeView() {
    if(!this._canvas || !this._view) {
      return ;
    }
    for(let dot of this._dots) {
      this._view.remove(dot);
    }
    if(this._borderRect) {
      this._view.remove(this._borderRect);
      this._borderRect = null;
    }
    if(this._center) {
      this._view.remove(this._center);
      this._center = null;
    }
    if(this._centralDot) {
      this._view.remove(this._centralDot);
      this._centralDot = null;
    }
    this._canvas.remove(this._view);
    this._view = null;
    this._dots = [];
    this._render();
  }

  private _recreateView() {
    if(!this._canvas || this._model.length === 0 || !this._view) {
      return ;
    }
    this._removeView();
    this._createView();
  }

  private _render() {
    if(this._canvas && this._shouldDoRenderCall) {
      this._canvas.requestRenderAll();
    }
  }

  public remove() {
    this._removeView();
  }

}
