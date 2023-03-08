import React, { useState } from "react";
import TutorialItem from "./TutorialItem";
import tutorialInfo from "../tutorialInfo";
export default function Tutorial() {
  const [tutorialItemsPointer, setTutorialItemsPointer] = useState(0);
  const tutorialItems = tutorialInfo.map((tutorialItem, i) => {
    return (
      <TutorialItem
        tutorialDescription={tutorialItem.description}
        tutorialHeader={tutorialItem.header}
        tutorialSubheader={tutorialItem.subheader}
        tutorialImage={tutorialItem.image}
        tutorialImageAlt={tutorialItem.imageAlt}
      />
    );
  });
  const endOfTutorial = (
    <div className="flex flex-col space-y-4 text-center  grow  ">
      <h1 className="text-md md:text-xl lg:text-3xl font-bold text-[#7A003C]">
        End of Tutorial{" "}
      </h1>
      <h2 className="text-sm md:text-base lg:text-lg font-medium  text-[#5E6A71]">
        Feel free to use the application and play with it as you wish
      </h2>
      <p className="text-xs md:text-sm lg:text-base">
        The source code can be found at my{" "}
        <a
          href="https://github.com/arifm6"
          className="text-[#FDBF57]"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{" "}
        or on my{" "}
        <a
          href="https://ahmadarif.com"
          className="text-[#FDBF57]"
          target="_blank"
          rel="noopener noreferrer"
        >
          website
        </a>
      </p>
    </div>
  );
  tutorialItems.push(endOfTutorial);

  return (
    tutorialItemsPointer < tutorialItems.length && (
      <div className="fixed w-[70vw] md:w-[50vw] h-[70vh]   mx-auto top-[5rem] lg:top-[7.5rem] left-[15%] md:left-[25%] border-2 border-[#7A003C] bg-white z-[999] rounded-md p-4 flex flex-col justify-between space-y-1 ">
        <div className="absolute right-[2%] top-[2%] text-xs">{`${
          tutorialItemsPointer + 1
        }/${tutorialItems.length}`}</div>
        {tutorialItems[tutorialItemsPointer]}
        <div className="flex justify-between ">
          <button
            className="tutorial-button"
            onClick={() => setTutorialItemsPointer(tutorialItems.length)}
          >
            Skip Tutorial
          </button>
          <div className="flex space-x-2">
            {tutorialItemsPointer > 0 && (
              <button
                className="tutorial-button"
                onClick={() => {
                  setTutorialItemsPointer((prev) => prev - 1);
                }}
              >
                Previous
              </button>
            )}
            {
              <button
                className="tutorial-button"
                onClick={() => setTutorialItemsPointer((prev) => prev + 1)}
              >
                {tutorialItemsPointer < tutorialItems.length - 1
                  ? "Next"
                  : "Finish"}
              </button>
            }
          </div>
        </div>
      </div>
    )
  );
}
