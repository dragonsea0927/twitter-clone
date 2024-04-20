import React from "react";
import { useUsers } from "../profile/hooks/use-users";
import Person from "./person";
import Link from "next/link";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Connect = () => {
  const {
    data: people = [],
    isLoading,
    isError,
  } = useUsers({ queryKey: ["people-to-follow"], limit: 3 });

  return (
    <section aria-label="Who to follow" className="">
      {isLoading ? (
        <LoadingSpinner/>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <>
          <h2 className="text-lg py-3 px-4 font-semibold">Who to follow</h2>
          <div>
            {people.map((person) => {
              return <Person key={person.id} person={person} />;
            })}
          </div>
          <Link
            className="block p-[1em] cursor-pointer rounded-b-2xl hover:bg-slate-500/10 text-[15px]"
            href={`/people`}
          >
            <span className="text-sky-500"> Show more</span>
          </Link>
        </>
      )}
    </section>
  );
};

export default Connect;
