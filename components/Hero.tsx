import React from "react";

function Hero() {
  return (
    <div className="bg-white relative h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center flex-col text-center px-4 ">
      <img
        src="/bgg.jpg"
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover z-[1px]"
      />
      <div className="absolute inset-0 bg-black/50 w-full h-full"></div>
      <h1 className="text-[#F7B821] z-20 w-5/6 md:w-3/5 text-3xl md:text-5xl lg:text-6xl font-bold">
        <span className="text-[#44D2D6]">Buy Social</span>{" "}
        <span className="text-[#EB4374]">Media Accounts</span> At Affordable Prices
      </h1>

      <div className="flex gap-3 md:gap-6 mt-5 z-20 items-center justify-center">
        <button className="bg-[#44D2D6] text-white px-8 py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-[#36b8bb] transition-colors">
          Buy Now
        </button>
        <button className="bg-[#EB4374] text-white px-8 py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-[#d33c6e] transition-colors">
          Explore
        </button>
      </div>
    </div>
  );
}

export default Hero;
