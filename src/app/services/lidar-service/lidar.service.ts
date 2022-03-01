import { Injectable } from '@angular/core';
import { RequestService } from "../request-service/request.service";
import { Observable } from "rxjs";

import { LidarScanInterface } from "../../interfaces/lidar-interfaces/lidar-scan-interface";
import { LidarInfoInterface } from "../../interfaces/lidar-interfaces/lidar-info-interface";
import { LidarHealthInterface } from "../../interfaces/lidar-interfaces/lidar-health-interface";

@Injectable({
  providedIn: 'root'
})
export class LidarService {

  private readonly _lidarURL: string = 'lidar/';
  private readonly _scanURL: string = this._lidarURL + 'scan';
  private readonly _resetURL: string = this._lidarURL + 'reset';
  private readonly _getInfoURL: string = this._lidarURL + 'info';
  private readonly _getHealthURL: string = this._lidarURL + 'health';
  private readonly _stopMotorURL: string = this._lidarURL + 'motor/stop';
  private readonly _startMotorURL: string = this._lidarURL + 'motor/start';

  constructor(private _requestService: RequestService) { }

  public get scans(): Observable<LidarScanInterface[]> {
    return this._requestService.getRequest<LidarScanInterface[]>(this._scanURL);
  }

  public get info(): Observable<LidarInfoInterface> {
    return this._requestService.getRequest<LidarInfoInterface>(this._getInfoURL);
  }

  public get health(): Observable<LidarHealthInterface> {
    return this._requestService.getRequest<LidarHealthInterface>(this._getHealthURL);
  }

  public reset() {}

  public startMotor() {}

  public stopMotor() {}
}
