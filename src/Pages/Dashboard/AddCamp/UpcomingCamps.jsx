import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { TbFidgetSpinner } from "react-icons/tb";
import UseAuth from "../../../Hooks/UseAuth";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DateTimePicker from "react-datetime-picker";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpcomingCamps = () => {
  const { user, loading } = UseAuth();
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const campInfo = {
        campName: data.campName,
        image: res.data.data.display_url,
        fees: data.price,
        dateTime: value,
        location: data.location,
        services: data.services,
        audience: data.audience,
        description: data.description,
        organizerEmail: user?.email,
      };
      const camps = await axiosSecure.post("/upcommingcamps", campInfo);
      if (camps.data.success) {
        reset();
        toast.success("Camp Added successfully");
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Add Upcoming Camps Camps</title>
      </Helmet>
      <SectionTitle heading="Add Upcoming Camp"></SectionTitle>
      <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Camp Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("campName", { required: true })}
                  type="text"
                  placeholder="Camp Name"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Location</label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("location", { required: true })}
                  type="text"
                  placeholder="Location"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Camp Fees</label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  name="price"
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Camp Fees"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-600">Date and Time</label>
                <div>
                  <DateTimePicker onChange={setValue} value={value} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
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
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Services</label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("services", { required: true })}
                  type="text"
                  placeholder="Services"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Audience</label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("audience", { required: true })}
                  type="text"
                  placeholder="Audience"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>

                <textarea
                  {...register("description", { required: true })}
                  type="text"
                  className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-Primary "
                  name="description"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="border-white mt-10 bg-Primary text-white hover:scale-110 transition-all w-full rounded-md py-3 "
          >
            {loading ? (
              <TbFidgetSpinner className="m-auto animate-spin" size={24} />
            ) : (
              "Add & Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpcomingCamps;
