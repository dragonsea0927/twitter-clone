import React from "react";
import { IMedia } from "./types";
// import styles from "./styles/tweet-media.module.scss";
import Image from "next/image";

const TweetMedia = ({
  media,
  tweet_id,
}: {
  media: IMedia[];
  tweet_id: string;
}) => {
  return (
    <></>
    // <div className={styles.container}>
    //   <div
    //     aria-label="Media"
    //     className={`${styles.media} ${
    //       media?.length === 1
    //         ? styles.one
    //         : media?.length === 2
    //         ? styles.two
    //         : media?.length === 3
    //         ? styles.three
    //         : media?.length === 4
    //         ? styles.four
    //         : ""
    //     }`}
    //   >
    //     {media?.map((media, index) => {
    //       return (
    //         <Image
    //           key={media.id}
    //           src={media?.media_url}
    //           aria-label="Image"
    //           alt="Image"
    //           width={1000}
    //           height={1000}
    //           draggable={true}
    //           className="w-full h-full object-cover "
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default TweetMedia;
