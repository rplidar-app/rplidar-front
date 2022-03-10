import { Injectable } from '@angular/core';
import { fabric } from "fabric";
import { LidarService } from "../lidar-service/lidar.service";
import { PointsGroupFabricView } from "../../classes/fabric-views/points-group-fabric-view/points-group-fabric-view";
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScansDrawingService {

  private _canvas: fabric.Canvas | null = null;
  private _centralDot: fabric.Circle | null = null;
  private _ungroupedPoints: PointsGroupFabricView | null = null;
  private _untrackedPoints: PointsGroupFabricView | null = null;
  private _trackedObjects: PointsGroupFabricView[] = [];
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
        this._lidarService.scans.subscribe(scan => {
          if(this._trackedObjects.length !== 0) {
            for(let obj of this._trackedObjects) {
              obj.remove();
            }
            this._trackedObjects = []
          }
          if(this._ungroupedPoints !== null) {
            this._ungroupedPoints.remove();
            this._ungroupedPoints = null;
          }
          if(this._untrackedPoints !== null) {
            this._untrackedPoints.remove();
            this._untrackedPoints = null;
          }
          if(this._canvas === null) {
            return ;
          }
          this._untrackedPoints = new PointsGroupFabricView(
            this._canvas, scan.untracked_points,
            '#FFF', .25, false, false
          );
          this._ungroupedPoints = new PointsGroupFabricView(
            this._canvas, scan.ungrouped_points,
            this._unclustered_points_color, 1, false, false
          );
          for(let i = 0; i < scan.objects.length; i += 1) {
            this._trackedObjects.push(new PointsGroupFabricView(
              this._canvas, scan.objects[i].points,
              this._cluster_colors[i%this._cluster_colors.length], 1, true, false
            ));
          }
          this._canvas.requestRenderAll();
        })
      }
    });
  }
}
