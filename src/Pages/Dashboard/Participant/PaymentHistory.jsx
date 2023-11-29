import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

const PaymentHistory = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data } = useQuery({
    queryKey: ["register", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/${user?.email}`);
      return response.data.data;
    },
  });
  if (loading) {
    return <Spinner aria-label="Extra large spinner example" size="xl" />;
  }
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
      selector: (row) => row.registerdcampId?.paymentstatus,
      wrap: true,
    },
    {
      name: "Confirmation Status",
      selector: (row) => row.registerdcampId?.confirmationstatus,
    },
    {
      name: " Transaction",
      selector: (row) => row.transactionId,
      wrap: true,
    },
  ];
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Payment History</title>
      </Helmet>
      <SectionTitle heading="Payment History"></SectionTitle>
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

export default PaymentHistory;
