import React from "react";
import styles from "./loading-screen.module.scss";
import { FaXTwitter } from "react-icons/fa6";
import { TwitterIcon } from "@/assets/twitter-icon";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-dvw h-dvh z-50 flex justify-center items-center">
      <span className="sm:h-16 sm:w-16 h-12 w-12 dark:fill-white"><TwitterIcon /></span>
    </div>
  );
};

export default LoadingScreen;
