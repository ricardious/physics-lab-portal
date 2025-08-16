import SplashBoids from "@/components/molecules/SplashBoids";

const SplashHeader = () => {
  return (
    <div className="relative w-full h-[260px] sm:h-[300px] md:h-[310px] lg:h-[380px] overflow-hidden">
      {/* Boids Canvas Background */}
      <div className="absolute inset-0 z-0 w-full h-[270px] sm:h-[310px] md:h-[320px] lg:h-[390px] bg-event-horizon">
        <SplashBoids />
      </div>

      {/* Title Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <div
          id="splash_title"
          className="
            text-center
            text-3xl mt-[65px]
            sm:text-4xl sm:mt-[75px]
            md:text-5xl md:mt-[85px]
            lg:text-6xl lg:mt-[95px]
            xl:text-7xl xl:mt-[105px]
            leading-[1.1em] pointer-events-none cursor-default
          "
        >
          <h1 className="select-none">
            <b className="tracking-[4px] text-[1.1em]">LABORATORIOS FÍSICA</b>
            <br />
            <span className="tracking-[3px] text-[1em]">
              FACULTAD INGENIERÍA
            </span>
          </h1>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-0 w-full h-[50px] pointer-events-none">
          <div className="absolute w-1/2 h-full bg-nebula left-[-50px]"></div>
          <div className="absolute w-1/2 h-full bg-nebula right-[-50px]"></div>
          <div className="absolute w-0 h-0 border-solid border-l-[50px] border-l-aurora border-t-[50px] border-t-transparent left-[calc(50%-50px)]"></div>
          <div className="absolute w-0 h-0 border-solid border-r-[50px] border-r-aurora border-t-[50px] border-t-transparent right-[calc(50%-50px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashHeader;
