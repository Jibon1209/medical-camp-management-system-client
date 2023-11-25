import moment from "moment";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const CampsTable = ({ data }) => {
  const handleDelete = (rowId) => {
    console.log("button Click", rowId);
  };
  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.campName,
      sortable: "true",
    },
    {
      name: "Date and Time",
      selector: (row) => moment(row.dateTime).format("YYYY-MM-DD HH:mm:ss"),
      sortable: "true",
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Services",
      selector: (row) => row.services,
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
      cell: (row) => (
        <button onClick={() => handleDelete(row._id)}>delete</button>
        // <img
        //   className="w-[36px] h-[36px]"
        //   src={row.authorInfo.map((N) => N.photo)}
        //   alt={row.blogOwner}
        // />
      ),
    },
    // {
    //   name: " Description",
    //   center: "true",
    //   maxWidth: "50px",
    //
    // },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      keyField="_id"
      pagination
      responsive={true}
      button={true}
    />
  );
};
CampsTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default CampsTable;
