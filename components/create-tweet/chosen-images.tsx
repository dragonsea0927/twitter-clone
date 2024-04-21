import React from "react";
import { IChosenImages } from "./type/inde";
import styles from "./styles/chosen-images.module.scss";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";

const ChosenImages = ({
  chosenImages,
  setChosenImages,
}: {
  chosenImages: IChosenImages[];
  setChosenImages: (images: IChosenImages[]) => void;
}) => {
 
    
  return (
    <div
    className={`${styles.container} ${
        chosenImages.length === 1
          ? styles.one
          : chosenImages.length === 2
            ? styles.two
            : chosenImages.length === 3
              ? styles.three
              : chosenImages.length === 4
                ? styles.four
                : ""
      }`}
    >
      {chosenImages.map((image) => {
        return (
          <div key={image.id} className={styles.imageContainer}>
            <div className="relative">
              <Button
                variant={"outline"}
                aria-label="Remove media"
                onClick={() => {
                  setChosenImages(
                    chosenImages.filter((img) => img.id !== image.id)
                  );
                }}
                className="absolute top-2 dark:bg-neutral-700/70  bg-neutral-300/60 shadow-none right-2 p-0 h-8 w-8 dark:hover:bg-neutral-800 outline-none border-none "
              >
                <IoCloseOutline size={20} />
              </Button>
            </div>
            <Image
              src={image.url as string}
              alt=""
              width={1000}
              height={1000}
              className="block rounded-2xl object-cover h-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChosenImages;
