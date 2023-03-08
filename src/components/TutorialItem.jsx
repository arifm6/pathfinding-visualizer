import React from "react";

export default function TutorialItem({
  tutorialHeader,
  tutorialSubheader,
  tutorialDescription,
  tutorialImage,
  tutorialImageAlt,
}) {
  return (
    <div className="flex flex-col items-center space-y-4 py-6 w-[80%] mx-auto text-center h-full ">
      <h1 className="text-[5vh] font-bold text-[#7A003C]">{tutorialHeader}</h1>
      <h2 className="text-[3vh] font-medium  text-[#5E6A71]">
        {tutorialSubheader}
      </h2>
      <p className="text-[2vh] text-[#5A5A5A]">{tutorialDescription}</p>
      <img
        src={`${tutorialImage}`}
        className="h-[20%] lg:h-[30%]"
        alt={tutorialImageAlt}
      />
    </div>
  );
}
