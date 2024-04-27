"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');

  useEffect(()=>{
    setQuery(decodeURIComponent(searchParams?.get("query") || ''))
  },[searchParams])

  const handleSearch = (path: string) => {
    router.push(path);
    if (path !== "search") {
      setQuery("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
     
  };

  return (
    <form
      id="search-form"
      action={"#"}
      aria-label="Search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        handleSearch(`/search?query=${query}`);
      }}
    >
      <Input
        name="search"
        id="search"
        aria-label="Search query"
        autoComplete="off"
        spellCheck="false"
        enterKeyHint="search"
        autoCorrect="off"
        className="rounded-full ps-4 sm:h-9 h-8 bg-gray-400/20 shadow-none placeholder:font-normal text-sm font-normal "
        placeholder="Search"
        value={query}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </form>
  );
};

export default Search;
