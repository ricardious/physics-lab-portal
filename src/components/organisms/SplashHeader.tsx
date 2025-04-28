import { useState, useEffect } from "react";
import SplashBoids from "../molecules/SplashBoids";

interface SplashHeaderProps {
  title?: string;
  subtitle?: string;
}

const SplashHeader = ({
  title = "EXPLORABLE",
  subtitle = "EXPLANATIONS",
}: SplashHeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on client-side
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <div className="relative w-full h-[40vh]">
      {/* Boids Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SplashBoids />
      </div>

      {/* Title Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div
          className={`text-center ${
            isMobile ? "mt-24 text-6xl" : "mt-16 text-8xl"
          }`}
        >
          <h1 className="font-bold">
            <span className="tracking-wider text-[1.085em]">
              E<span className="relative right-[-4px]">X</span>
              <span className="relative right-[-5px]">P</span>L
              <span className="relative left-[-3px]">O</span>
              <span className="relative left-[-8px]">R</span>ABLE
            </span>
            <br />
            <span className="tracking-wider">
              EXP<span className="relative left-[-6px]">L</span>ANATIONS
            </span>
          </h1>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashHeader;
