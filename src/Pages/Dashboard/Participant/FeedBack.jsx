import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const FeedBack = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { refetch, data } = useQuery({
    queryKey: ["register", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/participant/paid/register/${user?.email}`
      );
      return response.data.data;
    },
  });

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.camp.campName,
      sortable: "true",
      wrap: true,
    },
    {
      name: "Date and Time",
      selector: (row) =>
        moment(row.camp.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
      wrap: true,
    },
    {
      name: "Venue",
      selector: (row) => row.camp.location,
    },
    {
      name: "Fees",
      selector: (row) => row.camp.fees,
    },
    {
      name: " Payment Status",
      selector: (row) => row.paymentstatus,
      wrap: true,
    },
    {
      name: "Confirmation Status",
      selector: (row) => row.confirmationstatus,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-1">
          <button
            className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
            onClick={() => setOpenModal(true)}
          >
            Review
          </button>
        </div>
      ),
    },
  ];
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const feedBackInfo = {
        rating: data.rating,
        image: res.data.data.display_url,
        comment: data.comment,
        username: user?.displayName,
      };
      const feedbackRes = await axiosSecure.post("/feedback", feedBackInfo);
      if (feedbackRes.data.success) {
        reset();
        setOpenModal(false);
        toast.success("Camp Added successfully");
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Feedback and Ratings</title>
      </Helmet>
      <SectionTitle heading="Feedback and Ratings"></SectionTitle>
      <div className="rounded-md">
        <DataTable
          columns={columns}
          data={data}
          pagination
          responsive={true}
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
      </div>
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Feedback</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-center items-center mx-auto max-w-md flex-col gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label value="Rating" />
                    </div>
                    <TextInput
                      type="number"
                      {...register("rating", { required: true })}
                      placeholder="Rating out of 5"
                    />
                  </div>
                  <div className="  w-full  rounded-lg">
                    <label htmlFor="image" className="block mb-2 text-sm">
                      Select Image:
                    </label>
                    <input
                      required
                      type="file"
                      {...register("image", { required: true })}
                      accept="image/*"
                      className="w-full border rounded-md border-Primary  text-gray-900"
                    />
                  </div>
                  <div className="mb-2 block">
                    <Label htmlFor="comment" value="Your message" />
                  </div>
                  <Textarea
                    id="comment"
                    {...register("comment", { required: true })}
                    placeholder="Leave a comment..."
                    rows={4}
                  />
                </div>
                <div className="flex items-center gap-2"></div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default FeedBack;
