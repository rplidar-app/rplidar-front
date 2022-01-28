import { Injectable } from '@angular/core';
import { fabric } from "fabric";
import { LidarService } from "../lidar-service/lidar.service";
import { LidarScanInterface } from "../../interfaces/lidar-interfaces/lidar-scan-interface";
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScansDrawingService {

  private _degToRadFactor: number = Math.PI/180;
  private _canvas: fabric.Canvas | null = null;
  private _group: fabric.Group | null = null;
  private _centralDot: fabric.Circle | null = null;
  private _dots: fabric.Circle[] = [];
  private readonly _dotsProps: object = {
    originX: 'center', originY: 'center', radius: 5, left: 0, top: 0,
    opacity: 1, fill: 'white', stroke: '', strokeWidth: 0, evented: false, hasControls: false, hasBorders: false,
  };

  constructor(private _lidarService: LidarService) { }

  public init(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this._lidarService.scans.subscribe(scans => {
      if(this._canvas === null) {
        return ;
      }
      for(const scan of scans) {
        const coordinates = this._getDotCoordinates(scan);
        let dot = new fabric.Circle(this._dotsProps);
        dot.left = coordinates.x;
        dot.top = coordinates.y;
        // this._dots.push(dot);
        this._canvas.add(dot);
      }
      this._group = new fabric.Group(this._dots, {
        selectable: false, hasBorders: false, hasControls: false, evented: false
      });
      this._centralDot = new fabric.Circle(this._dotsProps);
      this._centralDot.fill = 'red';
      this._centralDot.radius = 10;
      // this._group.add(this._centralDot);
      this._canvas.add(this._centralDot);
      this._canvas.renderAll();
      // this._canvas.add(this._group);
      this._polling();
    });
  }

  private _polling() {
    interval(100).subscribe({
      next: () => {
        this._lidarService.scans.subscribe(scans => {
          if(this._group === null || this._canvas === null || this._centralDot === null) {
            return ;
          }
          if(scans.length > this._dots.length) {
            for(let i = 0; i < scans.length - this._dots.length; i += 1) {
              let dot = new fabric.Circle(this._dotsProps);
              // this._group.add(dot);
              this._canvas.add(dot);
              this._dots.push(dot);
            }
          } else {
            if(scans.length < this._dots.length) {
              for(let i = scans.length - 1; i < this._dots.length; i += 1) {
                // this._group.remove(this._dots[i]);
                this._dots[i].opacity = 0;
                // this._dots[i].fill = 'blue'
                this._dots[i].dirty = true;
              }
            }
          }
          for(let i = 0; i < scans.length; i += 1) {
            const coordinates = this._getDotCoordinates(scans[i]);
            this._dots[i].left = coordinates.x;
            this._dots[i].top = coordinates.y;
            this._dots[i].opacity = 1;
            // this._dots[i].dirty = true;
          }
          // const oldCentralDotVpt = this._centralDot.calcTransformMatrix();
          // this._group.addWithUpdate();
          // const newCentralDotVpt = this._centralDot.calcTransformMatrix();
          // console.log(oldCentralDotVpt, newCentralDotVpt);
          // const left = this._group.left, top = this._group.top;
          // this._group.left = oldCentralDotVpt[4] + left - newCentralDotVpt[4];
          // this._group.top = oldCentralDotVpt[5] + top - newCentralDotVpt[5];

          // this._group.dirty = true;
          this._canvas.requestRenderAll();
        })
      }
    });
  }

  private _getDotCoordinates(scan: LidarScanInterface) {
    const angle = scan[1], distance = scan[2];
    return {
      x: -distance*Math.cos(angle*this._degToRadFactor),
      y: -distance*Math.sin(angle*this._degToRadFactor),
    };
  }
}
