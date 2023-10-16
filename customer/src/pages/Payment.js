import React, { useEffect, useState } from "react";
import { APIV1 } from "../redux/config/config";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;
const Payment = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await APIV1.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("success");
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <div>
      <StripeCheckout
        name="Lama Shop"
        image="https://avatars.githubusercontent.com/u/1486366?v=4"
        billingAddress
        shippingAddress
        //   description={`Your total is $${cart.total}`}
        description={`Your total is $${20}`}
        amount={10 * 100}
        token={onToken}
        stripeKey={KEY}
      >
        <button>Thanh toán</button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
