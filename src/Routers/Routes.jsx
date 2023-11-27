import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AddCamp from "../Pages/Dashboard/AddCamp/AddCamp";
import ParticipantProfile from "../Pages/Dashboard/Participant/ParticipantProfile";
import ProfessionalProfile from "../Pages/Dashboard/Professional/ProfessionalProfile";
import OrganizerProfile from "../Pages/Dashboard/Organizer/OrganizerProfile";
import ManageCamps from "../Pages/Dashboard/AddCamp/manageCamps";
import UpdateCamps from "../Pages/Dashboard/AddCamp/UpdateCamps";
import CampDetails from "../Pages/PopularCamps/CampDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/camp-details/:campId",
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.campId}`),
      },
      {
        path: "/availableCamps",
        element: (
          <PrivateRoute>
            <AvailableCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //organizer
      {
        path: "organizer-profile",
        element: <OrganizerProfile />,
      },
      {
        path: "add-a-camp",
        element: <AddCamp />,
      },
      {
        path: "manage-camps",
        element: <ManageCamps />,
      },
      {
        path: "update-camp/:campId",
        element: <UpdateCamps />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.campId}`),
      },
      //professional
      {
        path: "professional-profile",
        element: <ProfessionalProfile />,
      },
      //participant
      {
        path: "participant-profile",
        element: <ParticipantProfile />,
      },
    ],
  },
]);
