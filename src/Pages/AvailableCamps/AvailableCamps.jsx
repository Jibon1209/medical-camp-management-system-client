import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AvailableCard from "./AvailableCard";
import { useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const AvailableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [value, setValue] = useState();
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState([]);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { refetch } = useQuery({
    queryKey: ["camps", currentPage, itemsPerPage],
    queryFn: async () => {
      const [countRes, campsRes] = await Promise.all([
        axiosPublic.get("/campCount"),
        await axiosPublic.get(
          `/camps?page=${currentPage}&size=${itemsPerPage}`
        ),
      ]);
      setCount(countRes.data.data);
      setCards(campsRes.data.data);
      return campsRes.data.data;
    },
  });
  console.log(cards);
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  console.log(value);
  const handleKeyWordsSearch = async (e) => {
    e.preventDefault();
    const val = document.getElementById("title");
    const title = val.value;
    const keyRes = await axiosPublic.get("/camps");
    console.log(keyRes.data.data);
    if (title) {
      const filterData = keyRes.data.data.filter(
        (campName) => campName.campName === title
      );

      setCards(filterData);
    } else {
      refetch();
    }
  };
  const handleOrderSearch = (e) => {
    e.preventDefault();
    console.log("clicked");
    const sortedCamps = cards.slice().sort((a, b) => {
      const campNameA = a.campName.toUpperCase();
      const campNameB = b.campName.toUpperCase();
      return campNameA.localeCompare(campNameB);
    });

    setCards(sortedCamps);
  };
  return (
    <div className="pt-24 xl:px-24 px-4 mb-20">
      <Helmet>
        <title>CampHealth Portal | Available Camps</title>
      </Helmet>
      <SectionTitle heading="Available Camps"></SectionTitle>
      <div className="flex md:justify-center md:items-center my-10 md:flex-row flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-[300px]">
            <TextInput
              id="title"
              type="text"
              name="title"
              placeholder="KeyWords"
              required
            />
          </div>
          <div>
            <button
              onClick={handleKeyWordsSearch}
              className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-2">
          <div>
            <button
              onClick={handleOrderSearch}
              className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1"
            >
              Alphabetical Order
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <AvailableCard
              key={card._id}
              card={card}
              refetch={refetch}
            ></AvailableCard>
          ))}
        </div>
      </div>
      <div className="flex overflow-x-auto justify-center mt-10 gap-4">
        <Button
          color="light"
          className=" font-bold"
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            className={currentPage === page && "bg-Primary"}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </Button>
        ))}
        <Button color="light" className=" font-bold" onClick={handleNextPage}>
          Next
        </Button>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
        >
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </div>
    </div>
  );
};

export default AvailableCamps;
