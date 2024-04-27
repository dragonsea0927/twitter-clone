import Explore from "@/components/explore/explore";
import ExploreHeader from "@/components/header/explore-header";
import Trends from "@/components/trends/trends";

const page = () => {
  return (
    <>
      <div className="pb-10">
        <ExploreHeader />
        <div className="border-b pb-5">
          <Trends limit={15}/>
        </div>
        <Explore />
      </div>
    </>
  );
};

export default page;
