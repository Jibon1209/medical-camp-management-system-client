import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageRegistered = () => {
  const { user, loading } = UseAuth();
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
          hidden={loading || row.confirmationstatus === "Confirmed"}
          className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
          onClick={() => handleDelete(row._id)}
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
