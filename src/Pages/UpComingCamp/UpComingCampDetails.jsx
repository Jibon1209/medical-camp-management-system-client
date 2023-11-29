import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import useRole from "../../Hooks/useRole";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import moment from "moment";
import { Button, Label, Modal, TextInput } from "flowbite-react";

const UpComingCampDetails = () => {
  const {
    _id,
    campName,
    location,
    fees,
    dateTime,
    image,
    services,
    audience,
    professionalCount,
    participantCount,
    description,
  } = useLoaderData();
  console.log(campName);
  const { user } = UseAuth();
  const [userRole] = useRole();
  const [hidden, setHidden] = useState(true);
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
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (userRole === "organizer" || userRole === "professional") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [userRole]);

  const imageAnimate = {
    offscreen: { x: -100, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      rotate: [0, 10, 0],
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };

  const textAnimate = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };
  return (
    <div className="xl:px-24 px-4 pt-20 mb-10">
      <Helmet>
        <title>CampHealth Portal | Upcoming Camp Details</title>
      </Helmet>
      <SectionTitle heading="Upcoming Camps Details"></SectionTitle>
      <motion.div
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.5 }}
        className="flex flex-col md:flex-row lg:justify-evenly items-center gap-6"
      >
        <motion.div
          variants={imageAnimate}
          className="flex justify-center items-center"
        >
          <img className="rounded-md" src={image} alt="" />
        </motion.div>
        <div className="font-normal text-gray-700 dark:text-gray-400 space-y-3">
          <motion.h5
            variants={textAnimate}
            className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {campName}
          </motion.h5>
          <motion.p variants={textAnimate} className="lg:text-lg">
            Fees: {fees}
          </motion.p>
          <motion.p variants={textAnimate}>
            Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
          </motion.p>
          <motion.p variants={textAnimate}>Location: {location}</motion.p>
          <motion.p variants={textAnimate}>
            {/* Professional: {professional.name} */}
          </motion.p>
          <motion.p variants={textAnimate}>Audience: {audience}</motion.p>
          <motion.p variants={textAnimate}>Services: {services}</motion.p>
          <motion.p variants={textAnimate}>{description}</motion.p>
          <motion.div variants={textAnimate}>
            <button
              onClick={() => setOpenModal(true)}
              hidden={hidden}
              className="py-2 px-2 bg-Primary text-white rounded-md mr-2 mb-1 hover:scale-110 transition-all"
            >
              Join Upcoming Camp
            </button>
          </motion.div>
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
            </Modal>
          </>
        </div>
      </motion.div>
    </div>
  );
};

export default UpComingCampDetails;
