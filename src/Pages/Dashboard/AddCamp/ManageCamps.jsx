import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import DataTable from "react-data-table-component";
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/all/camps/${user?.email}`);
      return response.data.data;
    },
  });
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
        const res = await axiosSecure.delete(`/camps/${rowId}`);
        // console.log(res.data);
        if (res.data.success) {
          // refetch to update the ui
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

  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.campName,
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
      selector: (row) => row.location,
    },
    {
      name: "Services",
      selector: (row) => row.services,
      wrap: true,
    },
    {
      name: "Professionals",
      selector: (row) => row.professional,
    },
    {
      name: "Audience",
      selector: (row) => row.audience,
    },
    {
      name: "Camp Fees",
      selector: (row) => row.fees,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-col lg:flex-row gap-1">
          <button
            className="py-1 px-2 bg-Red hover:scale-110 text-white rounded-md"
            onClick={() => handleDelete(row._id.toString())}
          >
            Delete
          </button>
          <Link to={`/dashboard/update-camp/${row._id.toString()} `}>
            <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mb-1">
              Update
            </button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="px-4">
      <Helmet>
        <title>CampHealth Portal | Manage Camps</title>
      </Helmet>
      <SectionTitle heading="Manage Camps" />

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

export default ManageCamps;
