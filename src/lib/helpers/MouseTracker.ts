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

  if (typeof window !== "undefined") {
    const onMouseMove = (event: MouseEvent) => {
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
    };

    const onTouchMove = (event: TouchEvent) => {
      const canvas = document.querySelector("canvas");

      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.changedTouches[0].clientX - rect.left;
        const y = event.changedTouches[0].clientY - rect.top;

        mouse.x = Math.max(0, Math.min(x, rect.width));
        mouse.y = Math.max(0, Math.min(y, rect.height));
      } else {
        mouse.x = event.changedTouches[0].clientX;
        mouse.y = event.changedTouches[0].clientY - window.pageYOffset;
      }
      event.preventDefault();
    };

    document.body.addEventListener(
      "mousedown",
      (event) => {
        mouse.pressed = true;
        onMouseMove(event);
      },
      false
    );

    document.body.addEventListener(
      "mouseup",
      () => {
        mouse.pressed = false;
      },
      false
    );

    document.body.addEventListener("mousemove", onMouseMove, false);

    document.body.addEventListener(
      "touchstart",
      (event) => {
        mouse.pressed = true;
        onTouchMove(event);
      },
      false
    );

    document.body.addEventListener(
      "touchend",
      () => {
        mouse.pressed = false;
      },
      false
    );

    document.body.addEventListener("touchmove", onTouchMove, false);
  }

  return mouse;
};
