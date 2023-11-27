import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";

const RegisteredCamps = () => {
  return (
    <div>
      <Helmet>
        <title>CampHealth Portal | Registered Camps</title>
      </Helmet>
      <SectionTitle heading="Registered Camps"></SectionTitle>
    </div>
  );
};

export default RegisteredCamps;
