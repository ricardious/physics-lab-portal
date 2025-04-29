import { useEffect, useRef } from "react";
import type { Mouse } from "../../lib/helpers/MouseTracker";
import type { Boid, Point } from "../../lib/types/types";
import {
  angleToVector,
  vectorToAngle,
  addToVector,
  normalize,
  tooClose,
  getCenterOfPoints,
  getClosestPoint,
  ifPointTooClose,
} from "../../lib/helpers/VectorHelpers";

interface BoidsCanvasProps {
  mouse: Mouse;
}

const BoidsCanvas = ({ mouse }: BoidsCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const requestRef = useRef<number>(0);

  // Constants
  const TAU = Math.PI * 2;
  const FLOCK_RADIUS = 500;
  const SEPARATION_RADIUS = 200;
  const RUN_RADIUS = 300;

  // For the circle effect
  const innerCircleSizeRef = useRef(25);
  const outerCircleRatioRef = useRef(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size with proper pixel density
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * 2;
      canvas.height = h * 2;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Create boids
    const createBoids = () => {
      boidsRef.current = [];
      const density = 1 / Math.pow(50, 2);
      const area = window.innerWidth * window.innerHeight;
      const count = Math.floor(density * area);

      for (let i = 0; i < count; i++) {
        const boid: Boid = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          a: Math.random() * TAU,
          speed: 3,
          update: function () {
            // Velocity
            this.x += Math.cos(this.a) * this.speed;
            this.y += Math.sin(this.a) * this.speed;

            // Get Closest Boids
            const closestBoids = tooClose(
              boidsRef.current,
              this,
              FLOCK_RADIUS
            ) as Boid[];

            if (closestBoids.length > 0) {
              // Alignment: Sum up angles, ease into it
              const myVector = angleToVector(this.a);
              const theirVector: [number, number] = [0, 0];

              for (let i = 0; i < closestBoids.length; i++) {
                const cb = closestBoids[i];
                addToVector(theirVector, angleToVector(cb.a));
              }

              normalize(theirVector, 0.05);
              normalize(myVector, 0.95);
              addToVector(myVector, theirVector);

              // Cohesion: Move towards center of crowd
              const center = getCenterOfPoints(closestBoids);
              addToVector(center, [-this.x, -this.y]); // relative center
              normalize(center, 0.05);
              normalize(myVector, 0.95);
              addToVector(myVector, center);

              // Separation: Away from CLOSEST BOID if TOO close
              const theClosestBoid = getClosestPoint(
                closestBoids,
                this,
                SEPARATION_RADIUS
              );

              if (theClosestBoid) {
                const separationCenter: [number, number] = [
                  theClosestBoid.x,
                  theClosestBoid.y,
                ];
                addToVector(separationCenter, [-this.x, -this.y]); // relative center
                normalize(separationCenter, -0.1);
                addToVector(myVector, separationCenter);
              }

              // GET AWAY FROM THE MOUSE
              const M: Point = { x: mouse.x * 2, y: mouse.y * 2 };

              if (ifPointTooClose(M, this, RUN_RADIUS)) {
                const mouseVector: [number, number] = [M.x, M.y];
                addToVector(mouseVector, [-this.x, -this.y]); // relative position

                // Calculate power based on distance
                const distance = Math.sqrt(
                  Math.pow(mouseVector[0], 2) + Math.pow(mouseVector[1], 2)
                );
                const power = 1 - distance / RUN_RADIUS;

                if (mouse.pressed) {
                  normalize(mouseVector, 0.5 * power);
                } else {
                  normalize(mouseVector, -0.5 * power);
                }

                addToVector(myVector, mouseVector);
              }

              // Turn into an angle!
              this.a = vectorToAngle(myVector);
            }

            // Bounds - wrap around edges
            const margin = 50;
            const w = canvas.width;
            const h = canvas.height;

            if (this.x < -margin) this.x = w + margin;
            if (this.y < -margin) this.y = h + margin;
            if (this.x > w + margin) this.x = -margin;
            if (this.y > h + margin) this.y = -margin;
          },
          draw: function (ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.a);
            ctx.beginPath();
            ctx.moveTo(20, 0);
            ctx.lineTo(-10, 10);
            ctx.lineTo(-10, -10);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          },
        };

        boidsRef.current.push(boid);
      }
    };

    createBoids();

    // Draw the circle that follows the mouse
    const drawCircle = (ctx: CanvasRenderingContext2D, outerRadius: number) => {
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.fillStyle = "rgba(255,255,255,0.5)";

      // Inner circle
      const innerCircleSizeGoTo = mouse.pressed ? 50 : 20;
      innerCircleSizeRef.current =
        innerCircleSizeRef.current * 0.9 + innerCircleSizeGoTo * 0.1;

      ctx.beginPath();
      ctx.arc(
        mouse.x * 2,
        mouse.y * 2,
        innerCircleSizeRef.current,
        0,
        TAU,
        false
      );
      ctx.fill();

      // Outer circle
      const outerCircleRatioGoTo = mouse.pressed ? 0.9 : 1;
      outerCircleRatioRef.current =
        outerCircleRatioRef.current * 0.9 + outerCircleRatioGoTo * 0.1;

      ctx.beginPath();
      ctx.arc(
        mouse.x * 2,
        mouse.y * 2,
        outerRadius * outerCircleRatioRef.current,
        0,
        TAU,
        false
      );
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    // Update loop
    const update = () => {
      boidsRef.current.forEach((boid) => boid.update());
    };

    // Animation frame loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;

      // Draw boids
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      boidsRef.current.forEach((boid) => boid.draw(ctx));

      // Draw circle
      drawCircle(ctx, RUN_RADIUS * 0.7);

      // Request next frame
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start the animation and update loops
    const updateInterval = setInterval(update, 1000 / 60);
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      clearInterval(updateInterval);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [mouse]);

  return <canvas ref={canvasRef} className="w-full h-full touch-none" />;
};

export default BoidsCanvas;
