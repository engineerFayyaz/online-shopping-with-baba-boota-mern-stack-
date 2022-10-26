import Image from "next/image";
import classes from "./checkout.module.css";
import { useState } from "react";

const PaymentGatewayList = ({ selectPaymentMethod, submitOrder, settings }) => {

  const[wallet, setWallet] = useState(false);

  const selectPaymentWallet = () =>{
    setWallet(!wallet);
    console.log("clicked", wallet)
  }
  const handleClose = () =>{

  }
  


  return (
    <div id="select-payment">
      <h6>Select a payment method :</h6>
      <div className={classes.payment_list}>
       
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="cod"
              defaultChecked
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <Image
                src="/images/cash-on-del-logo.png"
                width="100"
                height="50"
                alt="Cash On Delivery"
              />
              <span>Cash On Delivery</span>
            </div>
          </label>
          <button id="custom-btn" onClick={selectPaymentWallet}>
            <img src="/images/cash-on-del-logo.png"
                width="100"
                height="50"
                alt="Cash On Delivery" />Wallet
          </button>
        
     
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="paypal"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <Image
                src="/images/paypal-logo.png"
                width="100"
                height="50"
                alt="Paypal"
              />
              <span>Paypal</span>
            </div>
          </label>
        
       
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="stripe"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <Image
                src="/images/stripe-logo.png"
                width="100"
                height="50"
                alt="Stripe"
              />
              <span>Stripe</span>
            </div>
          </label>
      
     
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="sslcommerz"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <Image
                src="/images/ssl-logo.png"
                width="100"
                height="50"
                alt="Sslcommerz"
              />
              <span>Sslcommerz</span>
            </div>
          </label>
      
        <button className="my-3" onClick={submitOrder}>
          Complete Order
        </button>
      </div>
      {
      wallet && (
        <>
          <div className="wallet-checkout">
            <div>
                 <span className="close-icons" onClick={selectPaymentWallet}>x</span>
            </div>
              <div style={{textAlign: "center"}}>
                <h4>Total Balance</h4>
                <p style={{marginTop: "20px"}}><b>PKR: 20</b></p>
              </div>
          </div>
        </>
      )
    }
    </div>
    
  );
};

export default PaymentGatewayList;
