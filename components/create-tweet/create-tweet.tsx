"use client";
import { useSession } from "next-auth/react";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoImageOutline } from "react-icons/io5";
import { useCreateTweet } from "./hooks/use-create-tweet";
import { resizeTextarea } from "./utils/resize-textarea";
import { IChosenImages } from "./type/inde";
import { chooseImages } from "./utils/choose-images";
import ChosenImages from "./chosen-images";
import { ImageIcon } from "@/assets/image-icon";
import { GifIcon } from "@/assets/gif-icon";
import { PollIcon } from "@/assets/poll-icon";
import { ScheduleIcon } from "@/assets/schedule-icon";
import { LocationIcon } from "@/assets/location-icon";
import EmojiButton from "./emoji-button";

interface Props {
  placeholder?: string | null;
  in_reply_to_screen_name?: string | null;
  in_reply_to_tweet_id?: string | null;
  inputId?: string;
}

const CreateTweet = ({
  placeholder = "What's happening?",
  in_reply_to_screen_name,
  in_reply_to_tweet_id,
  inputId = "tweet-text",
}: Props) => {
  const { data: session }: any = useSession();
  const [text, setText] = useState("");

  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateTweet({
    setText,
    setChosenImages,
  });

  const textAreaRef = useRef<HTMLTextAreaElement>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    resizeTextarea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    resizeTextarea(textAreaRef.current);
  }, [text]);

  if (!session) return null;

  return (
    <div className="h-full flex overflow-auto border-b py-3 px-4 gap-3">
      <Avatar className="bg-center bg-cover h-9 w-9 ">
        <AvatarImage src={session?.currentUser?.profileImage} />
        <AvatarFallback>{session?.currentUser?.name[0]}</AvatarFallback>
      </Avatar>

      <form className="w-full">
        <div className="w-full space-y-3">
          {in_reply_to_screen_name && (
            <div className="text-sm text-zinc-800 dark:text-zinc-500">
              <span className="">Replying to</span>
              <span className="ml-1 text-sky-500">
                @{in_reply_to_screen_name}
              </span>
            </div>
          )}

          <div className="overflow-x-hidden overflow-y-auto w-full max-h-[320px]">
            <Textarea
              id={inputId}
              ref={inputRef}
              placeholder={placeholder as string}
              value={text}
              contentEditable="true"
              style={{ height: "0" }}
              className="border-none placeholder:text-light-gray px-0 h-0 resize-none shadow-none text-base focus:border-none focus:outline-none focus-visible:outline-none outline-none active:border-none focus-visible:border-none"
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {chosenImages && (
            <ChosenImages
              chosenImages={chosenImages}
              setChosenImages={setChosenImages}
            />
          )}

          <div className="flex flex-wrap items-center">
            <div className="flex flex-1 translate-x-[-8px] flex-wrap items-center">
              <Button
                type="button"
                variant={"outline"}
                tabIndex={0}
                className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                <ImageIcon />

                <input
                  ref={fileInputRef}
                  id="media"
                  className="hidden"
                  tabIndex={-1}
                  type="file"
                  onChange={(e) =>
                    chooseImages({
                      event: e,
                      setChosenImages,
                      chosenImagesLength: chosenImages.length,
                    })
                  }
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  max={4}
                  multiple
                  disabled={chosenImages.length >= 4}
                />
              </Button>

              <Button
                type="button"
                variant={"outline"}
                className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
              >
                <GifIcon />
              </Button>

              <Button
                type="button"
                variant={"outline"}
                className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
              >
                <PollIcon />
              </Button>

              <EmojiButton setText={setText} inputId={inputId} />

              <Button
                type="button"
                variant={"outline"}
                className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
              >
                <ScheduleIcon />
              </Button>

              <Button
                type="button"
                variant={"outline"}
                className="p-2 h-[34px] w-[34px] fill-sky-500 outline-none border-none rounded-full justify-center flex items-center hover:bg-zinc-400/10 transition-colors duration-200 ease-in-out "
              >
                <LocationIcon />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                disabled={
                  (text.length === 0 || text.length > 90) &&
                  chosenImages.length === 0
                }
                className="px-6 w-fit bg-sky-500 text-white font-semibold"
                onClick={() => {
                  mutation.mutate({
                    text: text.trim(),
                    userId: session?.currentUser?.id,
                    files: chosenImages.map((img) => img.file),
                    in_reply_to_screen_name,
                    in_reply_to_tweet_id,
                  });
                }}
              >
                {in_reply_to_tweet_id ? "Reply" : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
