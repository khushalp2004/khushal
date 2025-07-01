import React from "react";
import RotatingText from "../stylingblocks/RotatingText";

const HeroText = () => {
  return (
    <div className="z-10 mt-20 md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop view */}
      <div className="flex-col hidden md:flex c-space">
        <h1 className="text-3xl font-medium text-white text-white">Hi I'm Khushal </h1>
        <div className="flex flex-col items-start">
          <p className="text-5xl font-medium text-neutral-300">
            <span className="text-4xl">A Developer </span><br />
            Dedicated to
            <RotatingText
              texts={[
                "Backend",
                "Problem Solving",
                "Data Structures",
                "Algorithms",
              ]}
              mainClassName="text-8xl text-white overflow-hidden justify-start rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </p>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col space-y-6 md:hidden items-start">
        <p className="text-3xl font-medium">Hi I'm Khushal</p>
        <div className="flex flex-col justify-start items-start space-y-1">
          <p className="text-3xl font-black text-neutral-300">
            <span className="text-2xl">A Developer </span><br />
            Dedicated to
            <RotatingText
              texts={[
                "Backend",
                "Problem Solving",
                "Data Structures",
                "Algorithms",
              ]}
              mainClassName="text-6xl text-white overflow-hidden rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
