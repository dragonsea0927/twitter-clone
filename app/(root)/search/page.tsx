import ExploreHeader from '@/components/header/explore-header'
import SearchResults from '@/components/search/search-results'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="pb-10">
        <ExploreHeader />
        <SearchResults/>
      </div>
    </>
  )
}

export default page

export const metadata = {
  title: "Search",
};
