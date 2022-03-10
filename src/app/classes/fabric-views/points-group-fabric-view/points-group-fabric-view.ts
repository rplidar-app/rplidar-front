import { fabric } from "fabric";
import { LidarPointInterface } from "../../../interfaces/lidar-interfaces/lidar-point-interface";

export class PointsGroupFabricView {

  private readonly _canvas: fabric.Canvas | null = null;
  private _model: LidarPointInterface[] = [];
  private _color: string = '#FFF';
  private _opacity: number = 1;
  private _bordered: boolean = false;
  private _shouldDoRenderCall: boolean = true;

  private _view: fabric.Group | null = null;
  private _dots: fabric.Circle[] = [];

  private readonly _dotsBaseProps: fabric.ICircleOptions = {
    originX: 'center', originY: 'center', radius: 5, left: 0, top: 0, opacity: this._opacity, fill: this._color,
    stroke: '', strokeWidth: 0, evented: false, hasControls: false, hasBorders: false,
  };
  private readonly _viewBaseProps: fabric.IGroupOptions = {
    originX: 'left', originY: 'top', opacity: 1, stroke: this._color, strokeWidth: 2,
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
              color: string = '#FFF',
              opacity: number = 1,
              bordered: boolean = false,
              shouldDoRenderCall: boolean = true,) {
    this._canvas = canvas;
    this._model = model;
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
    for(let point of this._model) {
      let dot = new fabric.Circle(this._dotsBaseProps);
      dot.left = point[0];
      dot.top = point[1];
      dot.fill = this._color;
      dot.opacity = this._opacity;
      this._dots.push(dot);
    }
    this._view = new fabric.Group(this._dots, this._viewBaseProps);
    this._view.stroke = this._color;
    this._view.strokeWidth = this._bordered ? this._viewBaseProps.strokeWidth : 0;
    this._canvas.add(this._view);
    this._render();
  }

  private _removeView() {
    if(!this._canvas || !this._view) {
      return ;
    }
    for(let dot of this._dots) {
      this._view.remove(dot);
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
