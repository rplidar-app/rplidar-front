import { Injectable } from '@angular/core';
import { fabric } from "fabric";
import { LidarService } from "../lidar-service/lidar.service";
import { LidarScanInterface } from "../../interfaces/lidar-interfaces/lidar-scan-interface";
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScansDrawingService {

  private _canvas: fabric.Canvas | null = null;
  private _centralDot: fabric.Circle | null = null;
  private _dots: fabric.Circle[] = [];
  private readonly _dotsProps: object = {
    originX: 'center', originY: 'center', radius: 5, left: 0, top: 0,
    opacity: 1, fill: 'white', stroke: '', strokeWidth: 0, evented: false, hasControls: false, hasBorders: false,
  };

  constructor(private _lidarService: LidarService) { }

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._centralDot = new fabric.Circle(this._dotsProps);
    this._centralDot.fill = 'red';
    this._centralDot.radius = 10;
    this._canvas.add(this._centralDot);
    this._polling();
  }

  private _polling() {
    interval(100).subscribe({
      next: () => {
        this._lidarService.scans.subscribe(scans => {
          if(this._canvas === null || this._centralDot === null) {
            return ;
          }
          if(scans.length > this._dots.length) {
            // console.log('before: ', this._dots.length, scans.length);
            while (this._dots.length < scans.length) {
              let dot = new fabric.Circle(this._dotsProps);
              // this._group.add(dot);
              this._canvas.add(dot);
              this._dots.push(dot);
              // console.log('add', i)
            }
            // console.log('after: ', this._dots.length, scans.length);
          } else {
            if(scans.length < this._dots.length) {
              for(let i = scans.length - 1; i < this._dots.length; i += 1) {
                this._dots[i].opacity = 0;
                this._dots[i].dirty = true;
              }
            }
          }
          for(let i = 0; i < scans.length; i += 1) {
            const coordinates = ScansDrawingService._getDotCoordinates(scans[i]);
            // if(this._dots[i] === undefined) {
            //   console.log(this._dots.length, scans.length);
            //   return ;
            // }
            this._dots[i].left = coordinates.x;
            this._dots[i].top = coordinates.y;
            this._dots[i].opacity = 1;
          }
          this._canvas.requestRenderAll();
        })
      }
    });
  }

  private static _getDotCoordinates(scan: LidarScanInterface) {
    return {x: scan[0], y: scan[1]};
  }
}
