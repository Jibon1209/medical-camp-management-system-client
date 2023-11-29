import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../Components/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "flowbite-react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import moment from "moment";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosPublic.get("/feedback");
      return response.data.data;
    },
  });
  return (
    <section className="my-20 xl:px-24 px-4">
      <SectionTitle heading="Testimonials"></SectionTitle>

      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center  my-16">
              <p className="py-8">
                <div className="flex gap-1">
                  <sup>
                    <FaQuoteLeft />
                  </sup>
                  {review.comment}
                  <sup>
                    <FaQuoteRight />
                  </sup>
                </div>
              </p>
              <div className="flex flex-col justify-center items-center space-y-2">
                <h3 className="text-2xl text-black">{review.campName}</h3>
                <h3 className="text-2xl text-black">
                  {moment(review.date).format("YYYY-MM-DD")}
                </h3>
                <Rating
                  style={{ maxWidth: 90 }}
                  value={review.rating}
                  readOnly
                />
                <div className="flex justify-center items-center gap-2">
                  <Avatar img={review.image} alt="avatar of Jese" rounded />
                  <h3 className="text-2xl text-orange-400">
                    {review.username}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
