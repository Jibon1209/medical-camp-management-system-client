import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useRole from "../../Hooks/useRole";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AvailableCard = ({ card, refetch }) => {
  const {
    _id,
    campName,
    location,
    fees,
    dateTime,
    image,
    services,
    audience,
    participantCount,
  } = card;
  const { user } = UseAuth();
  const [userRole] = useRole();
  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

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
    const camps = await axiosSecure.post("/register", participantInfo);
    if (camps.data.success) {
      reset();
      refetch();
      toast.success("Camp Registered successfully");
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (userRole === "organizer" || userRole === "professional") {
      setDisabled(true);
    } else {
      setDisabled(false);
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
      transition: { type: "spring", bounce: 0.4, duration: 0.5 },
    },
  };
  return (
    <motion.div
      initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ staggerChildren: 0.5 }}
    >
      <Card
        className="w-full"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={image}
      >
        <motion.h5
          variants={textAnimate}
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {campName}
        </motion.h5>
        <div className="font-normal  text-gray-700 dark:text-gray-400 space-y-2">
          <div className="flex  justify-between items-center">
            <p>Fees: {fees}</p>
            <p> Participant Count: {participantCount}</p>
          </div>
          <motion.p variants={textAnimate}>
            Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
          </motion.p>
          <motion.p variants={textAnimate}>Location: {location}</motion.p>
          <motion.p variants={textAnimate}>
            Professional: {card.professional.name}
          </motion.p>
          <motion.p variants={textAnimate}>Audience: {audience}</motion.p>
          <motion.p variants={textAnimate}>Services: {services}</motion.p>
        </div>
        <motion.div
          variants={imageAnimate}
          className="flex justify-center items-center gap-4"
        >
          <Link to={`/camp-details/${_id}`}>
            <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md  mb-1">
              Details
            </button>
          </Link>
          <button
            onClick={() => setOpenModal(true)}
            disabled={disabled}
            className="py-2 px-2 bg-Primary text-white rounded-md  mb-1 hover:scale-110 transition-all"
          >
            Join Camp
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
      </Card>
    </motion.div>
  );
};
AvailableCard.propTypes = {
  card: PropTypes.object,
  refetch: PropTypes.func,
};
export default AvailableCard;
