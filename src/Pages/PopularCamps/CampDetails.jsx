import moment from "moment";
import SectionTitle from "../../Components/SectionTitle";
import { useLoaderData } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const CampDetails = () => {
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
  const { user } = UseAuth();
  const [userRole] = useRole();
  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const participantInfo = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      fees: data.fees,
      healthInfo: data.healthInfo,
      emergencyContact: data.emergencyContact,
      participantEmail: user?.email,
      campId: _id,
    };
    console.log(participantInfo);
    const camps = await axiosPublic.post("/register", participantInfo);
    if (camps.data.success) {
      reset();
      toast.success("Camp Registered successfully");
    }
  };

  useEffect(() => {
    if (userRole === "organizer" || userRole === "professional") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userRole]);

  return (
    <div className="xl:px-24 px-4 pt-20 mb-10">
      <SectionTitle heading="Camps Details"></SectionTitle>
      <div className="flex flex-col md:flex-row lg:justify-evenly items-center gap-6">
        <div className="flex justify-center items-center">
          <img className="rounded-md" src={image} alt="" />
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-400 space-y-3">
          <h5 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {campName}
          </h5>
          <p className="lg:text-lg">Fees: {fees}</p>
          <p>
            Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>Location: {location}</p>
          <p>Professional: {professional}</p>
          <p>Audience: {audience}</p>
          <p>Services: {services}</p>
          <p>{description}</p>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              disabled={disabled}
              className="py-2 px-2 bg-Primary text-white rounded-md mr-2 mb-1 hover:scale-110 transition-all"
            >
              Join Camp
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
                          placeholder="Name"
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
                          <Label value="Fees" />
                        </div>
                        <TextInput
                          type="text"
                          defaultValue={fees}
                          {...register("fees", { required: true })}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label value=" health-related information" />
                        </div>
                        <TextInput
                          type="text"
                          placeholder=" Health-related information"
                          {...register("healthInfo", { required: true })}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Emergency contact" />
                        </div>
                        <TextInput
                          type="text"
                          placeholder="Emergency contact"
                          {...register("emergencyContact", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2"></div>
                    <Button type="submit">Submit</Button>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button onClick={() => setOpenModal(false)}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button> */}
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
