import React, { useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IUser } from "@/types";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import { IoImageOutline } from "react-icons/io5";

interface Props {
  placeholder: string;
  user: IUser;
  retweet?: boolean;
  postId?: string;
}

const Tweet = ({ placeholder, user, retweet, postId }: Props) => {
  const { data, mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (retweet) {
        await axios.post("/api/comment", {
          body,
          postId,
        });
      } else {
        await axios.post("/api/posts", {
          body,
        });
      }

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  }, [body]);

  return (
    <div className="border-b-[1px] mt-2 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar className="bg-center bg-cover h-12 w-12">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Textarea
            placeholder={placeholder}
            value={body}
            rows={2}
            className="border-none shadow-none text-base focus:border-none active:border-none"
            onChange={(e) => setBody(e.target.value)}
          />
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className=" border-t-[1px] pt-2 mt-2 flex flex-row justify-between items-center">
            <div className="rounded-full hover:cursor-not-allowed justify-center flex items-center hover:bg-zinc-400/10 h-10 w-10">
              <IoImageOutline
                size={18}
                className=" text-sky-500 "
              />
            </div>
            <Button
              disabled={!body || isLoading}
              className="px-6 w-fit bg-sky-500 text-white font-semibold"
              onClick={onSubmit}
            >
              {retweet ? "Reply" : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
