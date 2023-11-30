import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const OrganizerProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [userData, setUserData] = useState(null);
  const { refetch, data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(
          `/userProfile/users/${user?.email}`
        );
        console.log(response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [user?.email]);

  const onSubmit = async (data) => {
    const participantInfo = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      email: data.email,
    };
    console.log(participantInfo);
    const updateRes = await axiosSecure.put(
      `/update/users/${user?.email}`,
      participantInfo
    );
    if (updateRes.data.success) {
      reset();
      toast.success("Update Profile successfully");
      setOpenModal(false);
      refetch();
    }
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Organizer profile</title>
      </Helmet>
      <SectionTitle heading="Organizer statistics"></SectionTitle>
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Organizer statistics
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Organized camps
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {stats.camps}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Revenue
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {stats.revenue}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Feedback
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {stats.feedback}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total users
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {stats.users}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center space-y-4 my-8">
        <h2 className="text-xl font-semibold ">Contact Information</h2>
        <p>Name: {userData?.name}</p>
        <p>Age: {userData?.age}</p>
        <p>Gender: {userData?.gender}</p>
        <p>Phone: {userData?.phone}</p>
        <p>Email: {userData?.email}</p>
        <p>Address: {userData?.address}</p>
        <button
          onClick={() => setOpenModal(true)}
          className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md "
        >
          Update
        </button>
      </div>
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Registration</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-center items-center mx-auto max-w-md flex-col gap-4"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label value="Name" />
                    </div>
                    <TextInput
                      type="text"
                      {...register("name", { required: true })}
                      defaultValue={userData?.email}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Age" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Age"
                      {...register("age", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label value="Gender" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Gender"
                      {...register("gender", { required: true })}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Phone" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Phone"
                      {...register("phone", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label value="Address" />
                    </div>
                    <TextInput
                      type="text"
                      placeholder="Address"
                      {...register("address", { required: true })}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Email" />
                    </div>
                    <TextInput
                      type="text"
                      defaultValue={userData?.email}
                      {...register("fees", { required: true })}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2"></div>
                <Button type="submit">Save</Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default OrganizerProfile;
