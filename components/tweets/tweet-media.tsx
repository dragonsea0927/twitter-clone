import React from "react";
import { IMedia } from "./types"; 
import Image from "next/image";

const TweetMedia = ({
  media,
  tweet_id,
}: {
  media: IMedia[];
  tweet_id: string;
}) => {

  const containerClass = `${
    media.length === 1
      ? "grid grid-cols-1 gap-1"
      : media.length === 2
      ? "grid grid-cols-2 gap-1"
      : "grid grid-cols-2 gap-1"
  }`;

  const gridTemplateAreas = `${
    media.length === 3
      ? "'first second' 'first third'"
      : media.length === 4
      ? "'first second' 'third fourth'"
      : ""
  }`;

  const aspectRatios = media.map((image, index) => {
    if (media.length === 2) {
      return index === 0 ? "0.85 / 1" : "0.85 / 1";
    } else if (media.length === 3) {
      return index === 0
        ? "0.85 / 1"
        : index === 1
        ? "1.76 / 1"
        : index === 2
        ? "1.76 / 1"
        : "";
    } else if (media.length === 4) {
      return index === 0
        ? "1.76 / 1"
        : index === 1
        ? "1.76 / 1"
        : index === 2
        ? "1.76 / 1"
        : index === 3
        ? "1.76/1"
        : "";
    }
  });

  return (
    <div className=" ">
      <div
      className={`${containerClass} rounded-2xl mt-2  overflow-hidden`}
      style={{ gridTemplateAreas: gridTemplateAreas }}>
      {media?.map((onemedia, index) => {
        return (
          <div
            key={onemedia.id}
            className="relative overflow-hidden h-full w-full"
            
            style={{
              gridArea:
              media.length === 3
                ? index === 0
                  ? "first"
                  : index === 1
                  ? "second"
                  : "third"
                : media.length === 4
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
            <Image
              src={onemedia?.media_url}
              aria-label="Image"
              alt="Image"
              width={1000}
              height={1000}
              draggable={true}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default TweetMedia;
