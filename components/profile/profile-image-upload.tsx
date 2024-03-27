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

const ProfileImageUpload = ({ data }: Props) => {
  const [image, setImage] = useState(data?.profileImage);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateUser } = useUser({ userId: data?._id });

  const updateProfileImage = async (newImage: string) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/users/${data._id}?type=updateImage`, { profileImage: newImage });
  
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
        updateProfileImage(evt.target.result);
      };
      reader.readAsDataURL(file);
    },
    [updateProfileImage]
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
        className: "text-white text-center border-none rounded-md",
      })}
    >
      <input {...getInputProps()} />
      {image ? (
        <>
         {isLoading && (
            <div className="relative -top-20 left-6">
              <div className="absolute rounded-full z-10 w-32 h-32 bg-black opacity-50  flex justify-center items-center">
                <Loader2 className="animate-spin text-sky-500" />
              </div>
            </div>
          )}
          <div className="relative -top-20 left-6 rounded-full transition cursor-pointer w-32 h-32 border-4 dark:border-black border-white">
            <Image
              src={image}
              fill
              alt="Uploaded image"
              style={{ objectFit: "cover", borderRadius: "100%" }}
            />
            <div className="absolute inset-0 rounded-full flex justify-center items-center">
              <Camera size={46} className={"text-white bg-zinc-900/80 p-3 rounded-full "} />
            </div>
          </div>
        </>
      ) : (
        <>
          
          <div className="relative -top-20 left-6">
            <div
              className={`rounded-full transition cursor-pointer relative w-32 h-32 border-2 border-black`}
            >
              <Image
                fill
                style={{ objectFit: "cover", borderRadius: "100%" }}
                alt="Avatar"
                src={"/images/placeholder.png"}
              />
              <div className="absolute inset-0 rounded-full flex justify-center items-center">
              <Camera size={46} className={"text-white bg-zinc-900/80 p-3 rounded-full "} />
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileImageUpload;
