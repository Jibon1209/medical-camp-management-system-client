import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageRegistered = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["register", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/register");
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
      selector: (row) => {
        return row.confirmationstatus === "Confirmed" ? (
          "Confirmed"
        ) : (
          <button
            onClick={() => handleConfirm(row._id)}
            className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
            // onClick={() => handleDelete(row._id.toString())}
          >
            {`${row.confirmationstatus}`}
          </button>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
          // onClick={() => handleDelete(row._id.toString())}
        >
          Cancle
        </button>
      ),
    },
  ];
  const handleConfirm = async (id) => {
    const res = await axiosSecure.patch(`/changeStatus/register/${id}`);
    if (res.data.data) {
      toast.success("Status updated successfully");
      refetch();
    }
    return res.data.data;
  };
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Manage Registered Camps</title>
      </Helmet>
      <SectionTitle heading="Manage Registered"></SectionTitle>
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

export default ManageRegistered;
