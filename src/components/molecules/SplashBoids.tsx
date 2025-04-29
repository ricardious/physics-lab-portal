import { useEffect, useState } from "react";
import BoidsCanvas from "../atoms/BoidsCanvas";
import { createMouseTracker } from "../../lib/helpers/MouseTracker";
import type { Mouse } from "../../lib/helpers/MouseTracker";

const SplashBoids = () => {
  const [mouse, setMouse] = useState<Mouse | null>(null);

  useEffect(() => {
    // Initialize mouse tracker on client-side only
    if (typeof window !== "undefined") {
      const mouseTracker = createMouseTracker();
      setMouse(mouseTracker);
    }
  }, []);

  if (!mouse) {
    return <div className="w-full h-full "></div>;
  }

  return (
    <div className="w-full h-full ">
      <BoidsCanvas mouse={mouse} />
    </div>
  );
};

export default SplashBoids;
