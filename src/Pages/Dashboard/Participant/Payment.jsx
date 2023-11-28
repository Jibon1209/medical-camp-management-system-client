import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const { _id, fees, camp } = useLoaderData();
  return (
    <div>
      <SectionTitle heading="Payment"></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            fees={fees}
            registerdId={_id}
            campId={camp}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
