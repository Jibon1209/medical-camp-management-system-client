/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";

const CheckoutForm = ({ fees, registerdId, campId }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const totalPrice = fees;
  console.log(fees, registerdId, campId);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          registerdcampId: registerdId,
          camp: campId,
        };
        console.log(payment);
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);

        if (res.data.success) {
          toast.success("Payment sent successfully");
        }
      }
    }
  };

  return (
    <div className="w-1/2 mx-auto my-20">
      <form onSubmit={handleSubmit}>
        <div className="w-full px-3 py-2 border rounded-md border-Primary  text-gray-900">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="my-4">
          {transactionId ? (
            <button
              className="py-1 px-2 bg-Primary  text-white rounded-md mb-1"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Paid
            </button>
          ) : (
            <button
              className="py-1 px-2 bg-Primary hover:scale-110  text-white rounded-md mb-1"
              type="submit"
            >
              Pay
            </button>
          )}
        </div>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
