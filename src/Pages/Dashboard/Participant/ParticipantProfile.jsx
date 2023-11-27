import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ParticipantProfile = () => {
  const { user } = UseAuth();
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: contact = [] } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/userProfile/users/${user?.email}`
      );
      console.log(response.data.data);
      return response.data.data;
    },
  });
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
        <title>CampHealth Portal | Participant-Profile</title>
      </Helmet>
      <SectionTitle heading="Participant Profile"></SectionTitle>

      <div className="mx-auto text-center space-y-4 my-8">
        <h2 className="text-xl font-semibold ">Contact Information</h2>
        <p>Name: {contact?.name}</p>
        <p>Age: {contact?.age}</p>
        <p>Gender: {contact?.gender}</p>
        <p>Phone: {contact?.phone}</p>
        <p>Email: {contact?.email}</p>
        <p>Address: {contact?.address}</p>
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
                      defaultValue={contact?.name}
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
                      defaultValue={contact?.email}
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

export default ParticipantProfile;
