import { create } from "zustand";

interface ISearchStore{
    query : string,
    setQuery : (query:string)=> void
}

export const useSearchStore = create<ISearchStore>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
}));
