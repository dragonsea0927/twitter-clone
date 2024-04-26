import React, { useRef, useState } from "react";
import { IProfile, IUser } from "./types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { Camera } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "./api/update-profile";

const EditProfileModal = ({
  user,
  closeModal,
}: {
  user: IUser;
  closeModal: () => void;
}) => {
  const [profile, setProfile] = useState<IProfile>({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    banner: {
      url: user?.coverImage || "",
      file: undefined,
    },
    avatar: { url: user?.profileImage || "", file: undefined },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      profile,
      userId,
    }: {
      profile: IProfile;
      userId: string;
    }) => { 
      
      return updateProfile(profile, userId);
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError: () => {
      console.log("Error");
    },
    onSettled: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["users", user?.id] });
    },
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const chooseImage = async (event: any, type: string) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "banner" && bannerInputRef.current)
      bannerInputRef.current.value = "";

    if (type === "avatar" && avatarInputRef.current)
      avatarInputRef.current.value = "";

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        [type]: { url: reader.result as string, file },
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={closeModal}>
        <DialogContent className="p-0 pb-4 max-w-[600px] max-h-[90vh] h-fit rounded-2xl overflow-y-auto">
          <DialogHeader className="p-4 pb-0 flex flex-row justify-between text-center items-center gap-2">
            <div className="flex flex-row text-center items-center space-x-4">
              <Cross2Icon className="h-5 w-5" onClick={() => closeModal()} />
              <DialogTitle>Edit profile</DialogTitle>
            </div>
            <div>
              <Button
                onClick={() => mutation.mutate({ profile, userId: user.id })}
              >
                Save
              </Button>
            </div>
          </DialogHeader>

          <div className="relative w-full aspect-[3/1] bg-gray-500">
            {profile?.banner?.url && (
              <Image
                src={profile?.banner?.url}
                alt="banner"
                className="block w-full h-full object-cover"
                width={500}
                height={500}
              />
            )}

            <input
              accept="image/jpeg,image/png,image/webp"
              tabIndex={-1}
              className="hidden"
              type="file"
              ref={bannerInputRef}
              onChange={(e) => chooseImage(e, "banner")}
            />

            <div className="absolute inset-0 flex gap-2 items-center justify-center">
              <Button
                className="w-fit px-2"
                variant={"outline"}
                onClick={() => {
                  bannerInputRef.current?.click();
                }}
              >
                <FaCamera size={16} />
              </Button>

              {profile?.banner?.url && (
                <Button
                  className="w-fit px-2"
                  variant={"outline"}
                  onClick={() => {
                    setProfile({
                      ...profile,
                      banner: { url: "", file: undefined },
                    });
                  }}
                >
                  <IoClose size={18} />
                </Button>
              )}
            </div>
          </div>

          <div className="relative -top-[60%] left-[4%] rounded-full transition cursor-pointer h-[10vh] w-[10vh] border-[4px] dark:border-black border-white">
            <Image
              src={
                profile?.avatar?.file
                  ? (profile?.avatar?.url as string)
                  : user?.profileImage
                  ? user?.profileImage
                  : `/images/user_placeholder.png`
              }
              fill
              alt="avatar"
              className="bg-gray-200"
               
              style={{ objectFit: "cover", borderRadius: "100%" }}
            />

            <input
              className={"hidden"}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              tabIndex={-1}
              ref={avatarInputRef}
              onChange={(e) => chooseImage(e, "avatar")}
            />

            <div className="absolute inset-0 rounded-full flex justify-center items-center">
              <Camera
                size={30}
                className={"text-white bg-zinc-900/80 p-[6px] rounded-full "}
                onClick={() => {
                  avatarInputRef.current?.click();
                }}
              />
            </div>
          </div>

          <div className="p-4 grid gap-6 ">
            <Input
              id="name"
              name="name"
              placeholder="Name"
              value={profile.name}
              maxLength={50}
              onChange={(e) => {
                setProfile((prev: IProfile) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />

            <Input
              id="bio"
              name="bio"
              placeholder="Bio"
              value={profile.bio}
              maxLength={160}
              onChange={(e) => {
                setProfile((prev: IProfile) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
            />
            <Input
              id="location"
              name="location"
              placeholder="Location"
              value={profile.location}
              maxLength={160}
              onChange={(e) => {
                setProfile((prev: IProfile) => ({
                  ...prev,
                  location: e.target.value,
                }));
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
