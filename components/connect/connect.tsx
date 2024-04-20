'use client'
import React from "react";
import { useUsers } from "../profile/hooks/use-users";
import PersonDetails from "./person-details";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Connect = () => {
  const {
    data: people = [],
    isLoading,
    isError,
  } = useUsers({ queryKey: ["people-to-follow"], limit: 20 });

  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  if (isError) {
    return <>Try again</>;
  }

  return (
    <div>
      {people?.map((person) => {
        return (
          <div key={person.id}>
            <PersonDetails author={person} />
          </div>
        );
      })}
    </div>
  );
};

export default Connect;
