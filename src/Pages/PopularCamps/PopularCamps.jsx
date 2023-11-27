import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CampCards from "../../Components/CampCards";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: popularCards = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await axiosPublic.get("/camps");
      return response.data.data;
    },
  });
  const [isSorting, setIsSorting] = useState(true);
  const [sortedPopularCards, setSortedPopularCards] = useState([]);

  useEffect(() => {
    refetch();
    setSortedPopularCards([...popularCards]);
  }, [popularCards]);

  const handleSort = (e) => {
    e.preventDefault();
    const sortedArray = [...sortedPopularCards].sort((a, b) => {
      return b.participantCount - a.participantCount;
    });
    setSortedPopularCards(isSorting ? sortedArray : [...popularCards]);
    setIsSorting(!isSorting);
  };
  return (
    <div className="xl:px-24 px-4 pt-10">
      <SectionTitle heading="Popular Medical Camps"></SectionTitle>
      <div className="my-10 flex justify-center">
        <button
          onClick={handleSort}
          className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1"
        >
          Sort by participant engagement
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPopularCards.slice(0, 8).map((popularCard) => (
          <CampCards
            key={popularCard._id}
            popularCard={popularCard}
          ></CampCards>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link to="/availableCamps">
          <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
