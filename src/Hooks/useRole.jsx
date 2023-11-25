import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isPending: roleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log(res.data.role);
      return res.data.role;
    },
  });
  return [role, roleLoading];
};

export default useRole;
