// src/lib/types/types.ts

export type Vector = [number, number];

export interface Point {
  x: number;
  y: number;
}

export interface Boid extends Point {
  a: number;
  speed: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}