import { Avatar, Dropdown } from "flowbite-react";
import UseAuth from "../Hooks/UseAuth";
import profilpic from "../assets/profile.png";

const DashHeader = () => {
  const { user, logOut } = UseAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" h-16 xl:px-24 px-4 flex items-center border-b shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-between">
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      {user ? (
        <div className="flex gap-4 items-center">
          <div className="flex -space-x-2 overflow-hidden">
            {user?.photoURL ? (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User settings" img={user?.photoURL} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user?.displayName}</span>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <button onClick={handleLogout}>Sign out</button>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                {" "}
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src={profilpic}
                  alt=""
                />
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashHeader;
