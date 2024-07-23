import React from "react";
import { IChosenImages } from "./type/inde";  
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";

const ChosenImages = ({
  chosenImages,
  setChosenImages,
}: {
  chosenImages: IChosenImages[];
  setChosenImages: (images: IChosenImages[]) => void;
}) => {
  
  const containerClass = `${
    chosenImages.length === 1
      ? "grid grid-cols-1 gap-3"
      : chosenImages.length === 2
      ? "grid grid-cols-2 gap-3"
      : "grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-3"
  }`;

  const gridTemplateAreas = `${
    chosenImages.length === 3
      ? "'first second' 'first third'"
      : chosenImages.length === 4
      ? "'first second' 'third fourth'"
      : ""
  }`;

 const aspectRatios = chosenImages.map((image, index) => {
    if (chosenImages.length === 2) {
      return index === 0 ? "0.85 / 1" : "0.85 / 1";
    } else if(chosenImages.length === 3) {
      return index === 0 ? "0.85 / 1" : index === 1 ? '1.76 / 1' : index === 2 ? '1.76 / 1' :'';
    }else if(chosenImages.length === 4) {
      return index === 0 ? "1.76 / 1" : index === 1 ? '1.76 / 1' : index === 2 ? '1.76 / 1' : index === 3 ? '1.76/1' : '';
    }
  });

  return (
    <div
      className={containerClass}
      style={{ gridTemplateAreas: gridTemplateAreas }}
    >
      {chosenImages.map((image, index) => (
        <div
          key={image.id}
          className="relative overflow-hidden"
          style={{
            gridArea:
              chosenImages.length === 3
                ? index === 0
                  ? "first"
                  : index === 1
                  ? "second"
                  : "third"
                : chosenImages.length === 4
                ? index === 0
                  ? "first"
                  : index === 1
                  ? "second"
                  : index === 2
                  ? "third"
                  : "fourth"
                : "",
            aspectRatio: aspectRatios[index], 
          }}
        >
          <Button
            variant={"outline"}
            aria-label="Remove media"
            onClick={() => {
              setChosenImages(
                chosenImages.filter((img) => img.id !== image.id)
              );
            }}
            className="absolute top-2 dark:bg-neutral-700/70 bg-neutral-300/60 shadow-none right-2 p-0 h-8 w-8 dark:hover:bg-neutral-800 outline-none border-none"
          >
            <IoCloseOutline size={20} />
          </Button>
          <img
            src={image.url as string}
            alt=""
            className="block rounded-2xl object-cover h-full w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default ChosenImages;
