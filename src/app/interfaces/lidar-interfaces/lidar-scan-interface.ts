import { LidarPointInterface } from "./lidar-point-interface";

export interface LidarScanInterface {
  untracked_points: LidarPointInterface[],
  ungrouped_points: LidarPointInterface[],
  objects: Array<{
    points: LidarPointInterface[],
    speed: number,
    center: [number, number],
  }>,
}
