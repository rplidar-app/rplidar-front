export interface LidarPointInterface extends Array<number> {
  0: number; // an X coordinate of the point
  1: number; // a Y coordinate of the point
  2: number; // a quality level of the point
  3: number; // a distance to the point from lidar's head`
  4: number; // an angle of the point
  length: 5;
}
