import SplashBoids from "@/components/molecules/SplashBoids";

const SplashHeader = () => {
  return (
    <div className="relative w-full h-[390px] overflow-hidden">
      {/* Boids Canvas Background */}
      <div className="absolute inset-0 z-0 w-full h-[400px] bg-blackhole-core">
        <SplashBoids />
      </div>

      {/* Title Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-white">
        <div
          id="splash_title"
          className="
            text-center
            text-2xl mt-[115px]
            sm:text-4xl sm:mt-[105px]
            md:text-5xl md:mt-[115px]
            lg:text-6xl lg:mt-[125px]
            xl:text-7xl xl:mt-[135px]
            leading-[0.85em] pointer-events-none cursor-default
          "
        >
          <h1 className="select-none">
            <b className="tracking-[4px] text-[1.085em]">LABORATORIOS FÍSICA</b>
            <br />
            <span className="tracking-[3px] text-[0.8em]">
              FACULTAD INGENIERÍA
            </span>
          </h1>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-0 w-full h-[50px] pointer-events-none">
          <div className="absolute w-1/2 h-full bg-nebula left-[-50px]"></div>
          <div className="absolute w-1/2 h-full bg-nebula right-[-50px]"></div>
          <div className="absolute w-0 h-0 border-solid border-l-[50px] border-l-nebula border-t-[50px] border-t-transparent left-[calc(50%-50px)]"></div>
          <div className="absolute w-0 h-0 border-solid border-r-[50px] border-r-nebula border-t-[50px] border-t-transparent right-[calc(50%-50px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashHeader;
