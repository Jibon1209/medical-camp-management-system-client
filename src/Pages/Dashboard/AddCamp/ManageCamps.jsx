import { useQuery } from "@tanstack/react-query";
import CampsTable from "../../../Components/CampsTable";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

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
  return (
    <div className="container mx-auto px-4">
      <div className="my-4 lg:my-8">
        <SectionTitle heading="Manage Camps" />
      </div>

      <div className="my-4 lg:my-8 rounded-md">
        <CampsTable data={data} />
      </div>
    </div>
  );
};

export default ManageCamps;
