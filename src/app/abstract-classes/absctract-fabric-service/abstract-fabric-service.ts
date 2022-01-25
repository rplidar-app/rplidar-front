import { fabric } from "fabric";

export abstract class AbstractFabricService {

  protected _canvas: fabric.Canvas | undefined = undefined;

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._bindEventHandlers();
  }

  protected abstract _bindEventHandlers(): any

}
