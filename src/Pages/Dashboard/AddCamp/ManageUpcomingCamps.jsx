import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table } from "flowbite-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ManageUpcomingCamps = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: manageupcoming = [] } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all/upcommingcamps/${user?.email}`
      );
      //console.log(response.data.data);
      return response.data.data;
    },
  });

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.campName,
      sortable: "true",
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: "Date and Time",
      selector: (row) => moment(row.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
      maxWidth: "200px",
    },
    {
      name: "Venue",
      selector: (row) => row.location,
      maxWidth: "200px",
    },
    {
      name: "Audience",
      selector: (row) => row.audience,
      maxWidth: "150px",
    },
    {
      name: " Participant Count",
      selector: (row) => row.participantCount,
      maxWidth: "150px",
      center: true,
    },
    {
      name: "Participant",
      maxWidth: "50px",
      center: true,
      cell: (row) => (
        <button
          className="py-1 px-2 bg-Primary hover:scale-110 text-white rounded-md"
          onClick={() => handleReview(row._id)}
        >
          Review
        </button>
      ),
    },
    {
      name: "Professionals Count",
      selector: (row) => row.professionalCount,
      maxWidth: "150px",
      center: true,
    },

    {
      name: "Professionals",
      maxWidth: "50px",
      center: true,
      cell: (row) => (
        <button
          className="py-1 px-2 bg-Primary hover:scale-110 text-white rounded-md"
          onClick={() => handleProfessionalReview(row._id.toString())}
        >
          Review
        </button>
      ),
    },
    {
      name: "Action",
      maxWidth: "50px",
      center: true,
      cell: (row) => (
        <>
          {row.participantCount >= 5 && row.professionalCount >= 1 && (
            <button
              className="py-1 px-2 bg-green-400 hover:scale-110 text-white rounded-md"
              onClick={() => handlePublish(row._id)}
            >
              Publish
            </button>
          )}
        </>
      ),
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="flex flex-col lg:flex-row gap-1">
          <button
            className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>

          <Link to={`/dashboard/update-upcoming-camp/${row._id} `}>
            <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
              Update
            </button>
          </Link>
        </div>
      ),
    },
  ];
  const handleDelete = (rowId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/upcommingcamps/${rowId}`);
        if (res.data.success) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Camp has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  //for participant
  const [participants, setParticipants] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [ishidden, setIshedden] = useState(true);

  //for Professional
  const [isLoading, setIsLoading] = useState(false);
  const [professional, setProfessional] = useState([]);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [selectedProfessionalData, setSelectedProfessionalData] =
    useState(null);
  const [isProfessionalhidden, setIsProfessionalhedden] = useState(true);

  const handleProfessionalReview = async (id) => {
    try {
      setIsLoading(true);
      const professionalRes = await axiosSecure.get(
        `/upcomingProfessional/${id}`
      );
      setProfessional(professionalRes.data);

      setSelectedProfessionalId(id);
      setSelectedProfessionalData(professionalRes.data);
      setIsProfessionalhedden(false);
      setIshedden(true);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const professionalRes = await axiosSecure.get(
          `/upcomingProfessional/${selectedProfessionalId}`
        );
        setSelectedItemData(professionalRes.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedProfessionalId) {
      fetchData();
    }
  }, [selectedProfessionalId, axiosSecure]);

  const handleprofessionalAccept = async (id) => {
    const acceptprof = await axiosSecure.patch(
      `/accept/upcomingProfessional/${id}`
    );
    if (acceptprof.data.success) {
      toast.success("Accepted  successfully");
      refetch();
    }
  };

  //for participant

  const handleReview = async (id) => {
    try {
      setIsLoading(true);
      const participantRes = await axiosSecure.get(
        `/upcomingParticipants/${id}`
      );
      setParticipants(participantRes.data);

      setSelectedItemId(id);
      setSelectedItemData(participantRes.data);
      setIshedden(false);
      setIsProfessionalhedden(true);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const participantRes = await axiosSecure.get(
          `/upcomingParticipants/${selectedItemId}`
        );
        setSelectedItemData(participantRes.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedItemId) {
      fetchData();
    }
  }, [selectedItemId, axiosSecure]);

  const handleparticipentAccept = async (id) => {
    const findParticipants = participants.find(
      (participant) => participant._id === id
    );
    const participantinfo = {
      name: findParticipants.name,
      age: findParticipants.age,
      gender: findParticipants.gender,
      phone: findParticipants.phone,
      address: findParticipants.address,
      fees: findParticipants.fees,
      healthInfo: findParticipants.healthInfo,
      emergencyContact: findParticipants.emergencyContact,
      participant: findParticipants.participant,
      camp: findParticipants.upcomingcamp,
    };
    const joinres = await axiosSecure.post(
      `/acceptParticipants/upcomingParticipants/${id}`,
      participantinfo
    );
    if (joinres.data.data) {
      toast.success("Accept participant successfully");
      refetch();
    }
  };
  const handlePublish = async (id) => {
    const filteredUpcomingCamp = manageupcoming.find(
      (upcoming) => upcoming._id === id
    );
    console.log(filteredUpcomingCamp);
    const campPublishInfo = {
      _id: filteredUpcomingCamp._id,
      campName: filteredUpcomingCamp.campName,
      location: filteredUpcomingCamp.location,
      fees: filteredUpcomingCamp.fees,
      dateTime: filteredUpcomingCamp.dateTime,
      image: filteredUpcomingCamp.image,
      services: filteredUpcomingCamp.services,
      audience: filteredUpcomingCamp.audience,
      description: filteredUpcomingCamp.description,
      organizer: filteredUpcomingCamp.organizer._id,
      participantCount: filteredUpcomingCamp.participantCount,
      professional: filteredUpcomingCamp._id,
    };

    console.log(campPublishInfo);
    const publishres = await axiosSecure.post(
      `/upcomingcamp/camps/${id}`,
      campPublishInfo
    );
    if (publishres.data.data) {
      toast.success("Published successfully");
      refetch();
    }
  };
  return (
    <div className="px-4">
      <Helmet>
        <title>CampHealth Portal | Manage Upcoming Camps</title>
      </Helmet>
      <SectionTitle heading="Manage Upcoming Camps" />

      <div className="rounded-md">
        <DataTable
          columns={columns}
          data={manageupcoming}
          pagination
          responsive={true}
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
      </div>
      <div className="mt-10">
        <div hidden={ishidden} className="overflow-x-auto">
          <h2 className="text-3xl font-bold text-center my-10">
            Review Participants
          </h2>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell> Age</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Emergency</Table.HeadCell>
              <Table.HeadCell>healthInfo</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {participants.map((participant) => (
                <Table.Row
                  key={participant._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {participant.name}
                  </Table.Cell>
                  <Table.Cell>{participant.age}</Table.Cell>
                  <Table.Cell>{participant.phone}</Table.Cell>
                  <Table.Cell>{participant.gender}</Table.Cell>
                  <Table.Cell>{participant.address}</Table.Cell>
                  <Table.Cell>{participant.emergencyContact}</Table.Cell>
                  <Table.Cell>{participant.healthInfo}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleparticipentAccept(participant._id)}
                      className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1"
                    >
                      Accept
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div hidden={isProfessionalhidden} className="overflow-x-auto">
          <h2 className="text-3xl font-bold text-center my-10">
            Review professional
          </h2>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Specialization</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>AreasOfInterest</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {professional.map((pro) => (
                <Table.Row
                  key={pro._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {pro.name}
                  </Table.Cell>
                  <Table.Cell>{pro.specialization}</Table.Cell>
                  <Table.Cell>{pro.phone}</Table.Cell>
                  <Table.Cell>{pro.address}</Table.Cell>
                  <Table.Cell>{pro.areasOfInterest}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleprofessionalAccept(pro._id)}
                      className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1"
                    >
                      Accept
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageUpcomingCamps;
