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
      return res.data.role;
    },
  });

  // Map server roles to your application roles
  const mapRoles = (serverRole) => {
    switch (serverRole) {
      case "admin":
        return "admin";
      case "organizer":
        return "organizer";
      case "professional":
        return "professional";
      case "participant":
        return "participant";
    }
  };

  const userRole = mapRoles(role);

  return [userRole, roleLoading];
};

export default useRole;
