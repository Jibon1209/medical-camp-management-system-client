import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import moment from "moment";
import { Link } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";

const AcceptedCamps = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["pro"],
    queryFn: async () => {
      const response = await axiosSecure.get("/upcomingProfessional");
      console.log(response.data.data);
      return response.data.data;
    },
  });

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.upcomingcamp?.campName,
      sortable: "true",
      wrap: true,
    },
    {
      name: "Date and Time",
      selector: (row) => moment(row.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
      wrap: true,
    },
    {
      name: "Location",
      selector: (row) => row.upcomingcamp?.location,
    },
    {
      name: "Audience",
      selector: (row) => row.upcomingcamp?.audience,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-col lg:flex-row gap-1">
          <Link to={`/dashboard/accept-camp-details/${row._id} `}>
            <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
              View Details
            </button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="px-4">
      <Helmet>
        <title>CampHealth Portal | Accepted Camps</title>
      </Helmet>
      <SectionTitle heading="Accepted Camps" />

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
    </div>
  );
};

export default AcceptedCamps;
