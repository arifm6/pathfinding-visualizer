import React from "react";

export default function TutorialItem({
  tutorialHeader,
  tutorialSubheader,
  tutorialDescription,
  tutorialImage,
  tutorialImageAlt,
}) {
  var imageStyle = {
    backgroundImage: `url(${tutorialImage})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="flex flex-col space-y-4 text-center  grow  ">
      <h1 className="text-md md:text-xl lg:text-3xl font-bold text-[#7A003C]">
        {tutorialHeader}
      </h1>
      <h2 className="text-sm md:text-base lg:text-lg font-medium  text-[#5E6A71]">
        {tutorialSubheader}
      </h2>
      <p className="text-xs md:text-sm lg:text-base">{tutorialDescription}</p>
      <div
        className="flex-grow flex "
        style={imageStyle}
        title={tutorialImageAlt}
      ></div>
    </div>
  );
}
