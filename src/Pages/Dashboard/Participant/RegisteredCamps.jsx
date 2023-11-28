import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment";

const RegisteredCamps = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["register", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `participant/register/${user?.email}`
      );
      return response.data.data;
    },
  });
  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.camp.campName,
      sortable: "true",
      wrap: true,
    },
    {
      name: "Date and Time",
      selector: (row) =>
        moment(row.camp.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
      wrap: true,
    },
    {
      name: "Venue",
      selector: (row) => row.camp.location,
    },
    {
      name: "Fees",
      selector: (row) => row.camp.fees,
    },
    {
      name: " Payment Status",
      selector: (row) => row.paymentstatus,
      wrap: true,
    },
    {
      name: "Confirmation Status",
      selector: (row) => row.confirmationstatus,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-1">
          <button
            className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
            // onClick={() => handleDelete(row._id.toString())}
          >
            Cancle
          </button>
          <Link to={`/dashboard/payment/${row._id} `}>
            <button className="py-1 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
              Pay
            </button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Registered Camps</title>
      </Helmet>
      <SectionTitle heading="Registered Camps"></SectionTitle>
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

export default RegisteredCamps;
