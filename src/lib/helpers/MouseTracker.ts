export interface Mouse {
  x: number;
  y: number;
  pressed: boolean;
}

export const createMouseTracker = (): Mouse => {
  const mouse: Mouse = {
    x: 0,
    y: 0,
    pressed: false,
  };

  /*
   * COMMENTED OUT: Initial mouse position centering code
   *
   * This block was causing issues because:
   * 1. It tried to find canvas before it was available in the DOM
   * 2. It conflicted with the initialization in BoidsCanvas.tsx
   * 3. Mouse position is now properly centered in BoidsCanvas component
   *    where we have direct access to the canvas element
   */
  /*
  if (typeof window !== "undefined") {
    // Try to center on the canvas immediately
    const canvas = document.querySelector("canvas");

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = rect.width / 2;
      mouse.y = rect.height / 2;
    } else {
      // Fallback - center on window width and adjust height with the offset you found
      mouse.x = window.innerWidth / 2;
      mouse.y = window.innerHeight / 2 - 150; // Subtracting the offset you found

      // Try again when DOM content is fully loaded
      window.addEventListener("DOMContentLoaded", () => {
        const loadedCanvas = document.querySelector("canvas");
        if (loadedCanvas) {
          const rect = loadedCanvas.getBoundingClientRect();
          mouse.x = rect.width / 2;
          mouse.y = rect.height / 2;
        }
      });
    }
  }
  */

  if (typeof window !== "undefined") {
    const isInsideCanvas = (clientX: number, clientY: number): boolean => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return false;

      const rect = canvas.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isInsideCanvas(event.clientX, event.clientY)) {
        // Get canvas element
        const canvas = document.querySelector("canvas");

        if (canvas) {
          // Get canvas position and dimensions
          const rect = canvas.getBoundingClientRect();

          // Calculate position relative to canvas
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          // Constrain to canvas bounds (0 to width, 0 to 400px height)
          mouse.x = Math.max(0, Math.min(x, rect.width));
          mouse.y = Math.max(0, Math.min(y, rect.height));
        } else {
          // Fallback if canvas not found
          mouse.x = event.pageX;
          mouse.y = event.pageY - window.pageYOffset;
        }
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (isInsideCanvas(touch.clientX, touch.clientY)) {
        const canvas = document.querySelector("canvas");

        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;

          mouse.x = Math.max(0, Math.min(x, rect.width));
          mouse.y = Math.max(0, Math.min(y, rect.height));
        }
      }
      event.preventDefault();
    };

    document.body.addEventListener(
      "mousedown",
      (event) => {
        if (isInsideCanvas(event.clientX, event.clientY)) {
          mouse.pressed = true;
          onMouseMove(event);
        }
      },
      false
    );

    document.body.addEventListener(
      "mouseup",
      (event) => {
        if (isInsideCanvas(event.clientX, event.clientY)) {
          mouse.pressed = false;
        }
      },
      false
    );

    document.body.addEventListener("mousemove", onMouseMove, false);

    document.body.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.changedTouches[0];
        if (isInsideCanvas(touch.clientX, touch.clientY)) {
          mouse.pressed = true;
          onTouchMove(event);
        }
      },
      false
    );

    document.body.addEventListener(
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];
        if (isInsideCanvas(touch.clientX, touch.clientY)) {
          mouse.pressed = false;
        }
      },
      false
    );

    document.body.addEventListener("touchmove", onTouchMove, false);
  }

  return mouse;
};
