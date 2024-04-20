import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";

export const Logo = () => {
  return (
    <div className="flex flex-row items-center ">
      <div className="relative w-12 h-12 rounded-full flex mt-3  items-center justify-center hover:bg-gray-500 hover:bg-opacity-10 lg:hidden">
        <Link href={`/`} aria-label="Twitter" className="">
          <FaXTwitter size={25} />
        </Link>
      </div>
      <div
        className={`relative hidden lg:flex gap-4 py-3 px-4 rounded-full hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer items-center`}
      >
        <Link href={`/`} aria-label="Twitter" className="">
          <FaXTwitter size={25} />
        </Link>
      </div>
    </div>
  );
};
