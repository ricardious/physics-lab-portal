import { useState, useEffect } from "react";
import SplashBoids from "../molecules/SplashBoids";

const SplashHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on client-side
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 641);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <div className="relative w-full h-[390px] overflow-hidden">
      {/* Boids Canvas Background */}
      <div className="absolute inset-0 z-0 w-full h-[400px]">
        <SplashBoids />
      </div>

      {/* Title Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <div
          id="splash_title"
          className={`text-center ${
            isMobile ? "text-4xl mt-[105px]" : "text-[80px] mt-[115px]"
          } leading-[0.85em] pointer-events-none cursor-default`}
        >
          <h1>
            <b className="tracking-[4px] text-[1.085em]">LABORATORIOS FÍSICA</b>
            <br />
            <span className="tracking-[3px] text-[0.8em]">
              FACULTAD INGENIERÍA
            </span>
          </h1>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-0 w-full h-[50px] pointer-events-none">
          <div className="absolute w-1/2 h-full bg-white left-[-50px]"></div>
          <div className="absolute w-1/2 h-full bg-white right-[-50px]"></div>
          <div className="absolute w-0 h-0 border-solid border-l-[50px] border-l-white border-t-[50px] border-t-transparent left-[calc(50%-50px)]"></div>
          <div className="absolute w-0 h-0 border-solid border-r-[50px] border-r-white border-t-[50px] border-t-transparent right-[calc(50%-50px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashHeader;
