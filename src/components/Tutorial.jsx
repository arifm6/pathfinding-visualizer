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

  return (
    tutorialItemsPointer < tutorialItems.length && (
      <div className="fixed w-[70vw] md:w-[50vw] h-[70vh]   mx-auto top-[7.5rem] left-[15%] md:left-[25%] border-2 border-[#7A003C] bg-white z-[999] rounded-md p-4 flex flex-col justify-between space-y-1 ">
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
            {tutorialItemsPointer < tutorialItems.length - 1 && (
              <button
                className="tutorial-button"
                onClick={() => setTutorialItemsPointer((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
        {/**
        <button
          className="absolute bottom-4 left-4 py-1 sm:py-2 px-2 sm:px-4 rounded-md bg-[#FDBF57] opacity-90 hover:opacity-80 active:opacity-100 text-[2vw] sm:text-lg"
          onClick={() => setTutorialItemsPointer(tutorialItems.length)}
        >
          Skip Tutorial
        </button>
        <div className="flex space-x-1 lg:space-x-6 absolute bottom-4 right-4 ">
          {tutorialItemsPointer > 0 && (
            <button
              className="bg-[#FDBF57] py-1 sm:py-2 px-2 sm:px-4 rounded-md opacity-90 hover:opacity-80 active:opacity-100 text-[2vw] sm:text-lg"
              onClick={() =>
                setTutorialItemsPointer((previousValue) => previousValue - 1)
              }
            >
              Previous
            </button>
          )}
          {tutorialItemsPointer < tutorialItems.length && (
            <button
              className="bg-[#FDBF57] py-1 sm:py-2 px-2 sm:px-4 rounded-md opacity-90 hover:opacity-80 active:opacity-100 text-[2vw] sm:text-lg"
              onClick={() =>
                setTutorialItemsPointer((previousValue) => {
                  return previousValue + 1;
                })
              }
            >
              {tutorialItemsPointer < tutorialItems.length - 1
                ? "Next"
                : "Finish"}
            </button>
          )}
          
        </div> */}
      </div>
    )
  );
}
