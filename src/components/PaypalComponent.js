import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import dotenv from 'dotenv';
import AddPlayerToCard from "./AddPlayerToCard";
import { useNavigate } from 'react-router-dom';


dotenv.config();

// This values are the props in the UI

const currency = "USD";
const style = { layout: "vertical" };
const clientID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, scorecardId, username, numHoles, creator, amount, userId }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();

  amount = parseFloat(amount).toFixed(2);
  
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency
      }
    });
  }, [currency, showSpinner]);


  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource="paypal"
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount
                  }
                }
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING"
            }
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (info) {
            // Your code here after capture the order
            AddPlayerToCard(scorecardId, username, numHoles, userId);
            if(creator){
              navigate(`/accesscode/${scorecardId}`);
            }else{
              navigate(`/scorecards/${scorecardId}`)
            }
            
          });
        }}
      />
    </>
  );
};

export default function PaypalComponent({scorecardId, username, numHoles, creator, numPlayers, price, userId}) {
  const amount = String ((price * numHoles) / numPlayers);
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
          clientID,
          components: "buttons",
          currency: "USD"
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} scorecardId={scorecardId} username={username} numHoles={numHoles} creator={creator} amount={amount} userId={userId}/>
      </PayPalScriptProvider>
    </div>
  );
}
