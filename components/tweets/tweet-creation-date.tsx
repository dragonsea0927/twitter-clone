import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const TweetCreationDate = ({
  date,
  link = "#",
}: {
  date: Date | undefined;
  link?: string;
}) => {
  const created = dayjs(date);

  return (
    <>
      <Link
        className="text-sm text-zinc-800 dark:text-zinc-500"
        href={`post/${link}`}
      >
        <time dateTime={created.format(`YYYY-MM-DDTHH:mm:ssZ`)}>
          {created.format(`h:mm A · MMM D, YYYY`)}
        </time>
      </Link>
    </>
  );
};

export default TweetCreationDate;
