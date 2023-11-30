import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["register", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/participant/register/${user?.email}`
      );
      console.log(response.data.data);
      return response.data.data;
    },
  });
  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.camp?.campName,
      sortable: "true",
      wrap: true,
    },
    {
      name: "Date and Time",
      selector: (row) =>
        moment(row.camp?.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
      wrap: true,
    },
    {
      name: "Venue",
      selector: (row) => row.camp?.location,
    },
    {
      name: "Fees",
      selector: (row) => row.camp?.fees,
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
            onClick={() => handleDelete(row._id)}
            disabled={loading || row.paymentstatus === "Paid"}
          >
            Cancle
          </button>
          {row.confirmationstatus === "Confirmed" ||
          row.paymentstatus === "Paid" ? (
            <button className="py-1 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
              Paid
            </button>
          ) : (
            <Link to={`/dashboard/payment/${row._id} `}>
              <button className="py-1 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
                Pay
              </button>
            </Link>
          )}
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/register/${id}`);
        const { success, error } = response.data;

        if (success) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: error || "An error occurred while deleting.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

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
