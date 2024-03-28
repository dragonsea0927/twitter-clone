import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageCircleMore } from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

interface Props {
  item: any;
}

const CommentItem = ({ item }: Props) => {
  const router = useRouter();

  const createdAt = useMemo(() => {
    if (!item?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(item.createdAt));
  }, [item?.createdAt]);

  const goToProfile = useCallback((e: any) => {
    e.stopPropagation();
    router.push(`/profile/${item.user._id}`);
  }, []);

  return (
    <div className="border-b-[1px] p-5 cursor-pointer  transition relative">
      <div className="flex flex-row gap-3 cursor-pointer">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={item?.user?.profileImage} />
          <AvatarFallback>{item?.user?.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex flex-row items-center gap-2" onClick={() => {}}>
            <div className="line-clamp-1">
              <span className="font-semibold cursor-pointer hover:underline">
                {item?.user?.name}
              </span>
            </div>
            <div className="line-clamp-1">
              <span className="text-neutral-500 text-sm cursor-pointer hover:underline hidden md:block">
                @{item?.user?.username}
              </span>
            </div>
            <div className="line-clamp-1">
              <span className="text-neutral-500 text-sm">{createdAt} ago</span>
            </div>
          </div>

          <span className="mt-1 text-sm">{item.body}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
