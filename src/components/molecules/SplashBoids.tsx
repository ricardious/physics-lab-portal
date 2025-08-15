import { useState } from "react";
import BoidsCanvas from "../atoms/BoidsCanvas";
import type { Mouse } from "../../lib/helpers/MouseTracker";

const SplashBoids = () => {
  const [mouse] = useState<Mouse>({
    x: 0,
    y: 0,
    pressed: false
  });

  return (
    <div className="w-full h-full ">
      <BoidsCanvas mouse={mouse} />
    </div>
  );
};

export default SplashBoids;
