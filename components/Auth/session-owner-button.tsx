import React  from "react"; 
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { EllipsisWrapper } from "../elements/ellipsis-wrapper"; 
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useUser } from "../profile/hooks/use-user";

const SessionOwnerButton = () => {
  const { data: session }: any = useSession();
  const {data:user} = useUser({ id: session.currentUser?.id });
 
  
  return (
    <div className="h-min mb-3 w-full">
      <Popover>
        <PopoverTrigger>
          <div className="px-4 py-2 grid cursor-pointer place-items-center rounded-full transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 fill-secondary-100   disabled-button   hover:bg-gray-500/20     border-none focus-visible:bg-neutral-800/50 focus-visible:outline-secondary-100   xxl:flex xxl:w-full xxl:gap-3">
            <div className="xxl:flex xxl:w-full xxl:gap-3 ">
              <Avatar className="relative aspect-square overflow-hidden rounded-full">
                <AvatarImage
                  className="block size-full object-cover"
                  src={
                    user?.profileImage || "/images/user_placeholder.png"
                  }
                />
                <AvatarFallback>{user?.username ? user.username[0] : ''}</AvatarFallback>
              </Avatar>

              <div className="hidden flex-col justify-start items-start xxl:flex">
                <div
                  className={`grid grid-flow-col text-milli font-semibold text-secondary-100
              hover:underline`}
                >
                  {user?.name && (
                    <span className="truncate">
                      {user?.name}
                    </span>
                  )}
                </div>

                <EllipsisWrapper>
                  <span className="text-light-gray text-sm">
                    @{user?.username}
                  </span>
                </EllipsisWrapper>
              </div>
            </div>

            <div className="hidden items-end fill-secondary-100 xxl:inline">
              <BsThreeDots size={18} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className=" cursor-pointer  hover:bg-opacity-10 transition"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <span className="text-sm">
              Log out{" "}
              {user?.username
                ? `@${user?.username}`
                : user?.name}
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SessionOwnerButton;
