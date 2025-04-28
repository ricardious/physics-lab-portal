// src/lib/helpers/VectorHelpers.ts

import type { Point, Vector } from '../types/types';

export const getCenterOfPoints = (points: Point[]): Vector => {
  const center: Vector = [0, 0];
  
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    center[0] += p.x;
    center[1] += p.y;
  }
  
  center[0] /= points.length;
  center[1] /= points.length;
  
  return center;
};

export const getClosestPoint = (points: Point[], comparison: Point, withinRadius: number): Point | null => {
  let minDistance = Infinity;
  let minPoint: Point | null = null;
  
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const dx = p.x - comparison.x;
    const dy = p.y - comparison.y;
    const d2 = dx * dx + dy * dy;
    
    if (d2 < minDistance) {
      minDistance = d2;
      minPoint = p;
    }
  }
  
  if (minDistance >= withinRadius * withinRadius) return null; // none close enough
  return minPoint;
};

export const tooClose = (points: Point[], comparison: Point, radius: number): Point[] => {
  const r2 = radius * radius;
  
  return points.filter((p) => {
    if (p === comparison) return false;
    const dx = p.x - comparison.x;
    const dy = p.y - comparison.y;
    const d2 = dx * dx + dy * dy;
    return (d2 < r2);
  });
};

export const ifPointTooClose = (point: Point, comparison: Point, radius: number): boolean => {
  const points = [point];
  return (tooClose(points, comparison, radius).length > 0);
};

export const angleToVector = (angle: number): Vector => {
  return [Math.cos(angle), Math.sin(angle)];
};

export const vectorToAngle = (vector: Vector): number => {
  return Math.atan2(vector[1], vector[0]);
};

export const addToVector = (a: Vector, b: Vector): Vector => {
  a[0] += b[0];
  a[1] += b[1];
  return a;
};

export const normalize = (vector: Vector, newMag: number = 1): Vector => {
  const mag = magnitude(vector);
  
  if (mag === 0) return vector;
  
  vector[0] = (vector[0] / mag) * newMag;
  vector[1] = (vector[1] / mag) * newMag;
  
  return vector;
};

export const magnitude = (vector: Vector): number => {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
};