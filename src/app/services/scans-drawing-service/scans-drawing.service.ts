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
  private readonly _unclustered_points_color: string = '#000000';
  private readonly _cluster_colors: string[] = [
    '#EC2409',
    '#F55B09',
    '#FE9403',
    '#FDEC00',
    '#99C403',
    '#03A534',
    '#1AACA3',
    '#098CBD',
    '#441AB3',
    '#642B8D',
    '#C42A93',
    '#EC2B55',
  ];

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
        this._lidarService.scans.subscribe(groupOfScans => {
          let points = [...groupOfScans.inside, ...groupOfScans.outside];
          if(this._canvas === null || this._centralDot === null) {
            return ;
          }
          if(points.length > this._dots.length) {
            // console.log('before: ', this._dots.length, scans.length);
            while (this._dots.length < points.length) {
              let dot = new fabric.Circle(this._dotsProps);
              // this._group.add(dot);
              this._canvas.add(dot);
              this._dots.push(dot);
              // console.log('add', i)
            }
            // console.log('after: ', this._dots.length, scans.length);
          } else {
            if(points.length < this._dots.length) {
              for(let i = points.length - 1; i < this._dots.length; i += 1) {
                this._dots[i].opacity = 0;
                this._dots[i].dirty = true;
              }
            }
          }
          for(let i = 0; i < points.length; i += 1) {
            const coordinates = ScansDrawingService._getDotCoordinates(points[i]);
            // if(this._dots[i] === undefined) {
            //   console.log(this._dots.length, scans.length);
            //   return ;
            // }
            this._dots[i].fill = 'white';
            this._dots[i].left = coordinates.x;
            this._dots[i].top = coordinates.y;
            if(i < groupOfScans.inside.length) {
              this._dots[i].opacity = 1;
              if(i < groupOfScans.cluster_labels.length) {
                const label = groupOfScans.cluster_labels[i];
                if(label == -1) {
                  this._dots[i].fill = this._unclustered_points_color;
                } else {
                  this._dots[i].fill = this._cluster_colors[label%this._cluster_colors.length];
                }
              }
            } else {
              this._dots[i].opacity = .25;
            }
            this._dots[i].dirty = true;
          }
          this._canvas.requestRenderAll();
        })
      }
    });
  }

  private static _getDotCoordinates(scan: number[]) {
    return {x: scan[0], y: scan[1]};
  }
}
