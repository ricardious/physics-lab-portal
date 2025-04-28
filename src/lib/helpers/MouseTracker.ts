export interface Mouse {
  x: number;
  y: number;
  pressed: boolean;
}

export const createMouseTracker = (): Mouse => {
  const mouse: Mouse = {
    x: typeof document !== "undefined" ? document.body.clientWidth / 2 : 0,
    y: typeof document !== "undefined" ? document.body.clientHeight / 2 : 0,
    pressed: false,
  };

  if (typeof window !== "undefined") {
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.pageX;
      mouse.y = event.pageY - window.pageYOffset;
    };

    const onTouchMove = (event: TouchEvent) => {
      mouse.x = event.changedTouches[0].clientX;
      mouse.y = event.changedTouches[0].clientY - window.pageYOffset;
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
