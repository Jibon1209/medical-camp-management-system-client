import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

const AddCamp = () => {
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState(new Date());
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    //res.data.data.display_url,
    const campInfos = {
      campName: data.campName,
      location: data.location,
      professional: data.professional,
      fees: data.price,
      dateTime: value,
      image: data.image[0],
      services: data.services,
      audience: data.audience,
      description: data.description,
    };
    console.log(campInfos);
  };
  return (
    <div>
      <SectionTitle
        heading="Add A Camp"
        subHeading="What's new?"
      ></SectionTitle>
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
                <label className="block text-gray-600">
                  Healthcare Professional
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900"
                  {...register("professional", { required: true })}
                  type="text"
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
              <div className=" lg:pt-6 w-full  rounded-lg">
                <div className="file_upload px-3 py-2 relative border border-Primary rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        {...register("image", { required: true })}
                        accept="image/*"
                        hidden
                      />
                      <div className=" text-gray-600  rounded font-semibold cursor-pointer p-1 px-3 hover:bg-Primary hover:text-white">
                        Upload Image
                      </div>
                    </label>
                  </div>
                </div>
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
            {/* {loading ? (
              <TbFidgetSpinner className="m-auto animate-spin" size={24} />
            ) : (
              "Save & Continue"
            )} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
