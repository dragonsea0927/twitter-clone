"use client";

import useUser from "@/hooks/useUser";
import { IUser } from "@/types";
import axios from "axios";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  data: IUser;
}

const CoverImageUpload = ({ data }: Props) => {
  const [image, setImage] = useState(data?.coverImage);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateUser } = useUser({ userId: data._id });

  const updateCoverImage = async (newImage: string) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/users/${data._id}?type=updateImage`, {
        coverImage: newImage,
      });
    } catch (error) {
      setIsLoading(false);
    } finally {
      mutateUser();
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        setImage(evt.target.result);
        updateCoverImage(evt.target.result);
      };
      reader.readAsDataURL(file);
    },
    [updateCoverImage, data._id]
  );

  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    maxSize: 1048576,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "text-white text-center border-none rounded-md w-full h-[200px] bg-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {image ? (
        <>
          {isLoading && (
            <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          )}
          <div className="w-full h-[200px]  relative left-0 right-0">
            <Image
              src={image}
              fill
              alt="Uploaded image"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <Camera size={50} className={"text-white bg-zinc-900/80 p-3 rounded-full "} />
            </div>
          </div>
        </>
      ) : (
        <div className="h-full flex justify-center cursor-pointer flex-col items-center gap-2">
          <Camera size={50}  className={"text-white bg-zinc-900/80 p-3 rounded-full "}/>
          <span className="text-sm">Upload cover image</span>
        </div>
      )}
    </div>
  );
};

export default CoverImageUpload;
