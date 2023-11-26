import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";
import SectionTitle from "../../../Components/SectionTitle";
import DateTimePicker from "react-datetime-picker";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamps = () => {
  const {
    _id,
    campName,
    location,
    professional,
    fees,
    dateTime,
    image,
    services,
    audience,
    description,
  } = useLoaderData();

  const { user, loading } = UseAuth();
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location2 = useLocation();
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
        location: data.location,
        professional: data.professional,
        fees: data.price,
        dateTime: value,
        image: res.data.data.display_url,
        services: data.services,
        audience: data.audience,
        description: data.description,
        organizerEmail: user?.email,
      };
      const camps = await axiosSecure.patch(`/camps/${_id}`, campInfo);
      if (camps.data.success) {
        navigate("/dashboard/manage-camps", {
          state: { from: location2 },
        });
        toast.success("Camp Updated successfully");
      }
    }
  };
  return (
    <div>
      <SectionTitle heading="Update Camp"></SectionTitle>
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
                  defaultValue={campName}
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
                  defaultValue={location}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">
                  Healthcare Professional
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("professional", { required: true })}
                  type="text"
                  defaultValue={professional}
                  placeholder="Healthcare Professional"
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
                  defaultValue={fees}
                  placeholder="Camp Fees"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-600">Date and Time</label>
                <div>
                  <DateTimePicker
                    defaultValue={dateTime}
                    onChange={setValue}
                    value={value}
                  />
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
                  defaultValue={services}
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
                  defaultValue={audience}
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
                  defaultValue={description}
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

export default UpdateCamps;
