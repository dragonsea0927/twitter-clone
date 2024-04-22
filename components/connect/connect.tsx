'use client'
import React from "react";
import { useUsers } from "../profile/hooks/use-users";
import PersonDetails from "./person-details";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";

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
    return <TryAgain/>;
  }

  return (
    <>
      {people?.map((person) => {
        return (
          <div key={person.id}>
            <PersonDetails author={person} />
          </div>
        );
      })}
    </>
  );
};

export default Connect;
