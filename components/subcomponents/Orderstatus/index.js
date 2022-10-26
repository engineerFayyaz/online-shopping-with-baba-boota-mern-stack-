import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast,ToastContainer } from "react-toastify";

import classes from "./orderstatus.module.css";
import { getSession } from "next-auth/react";


const Orderstatus = () => {
  const [cart,setCart] = useState([]);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();


  let[user,setUser]=useState({})
  useEffect(()=>{
  getProfile()
  },[])

  const getProfile=async()=>{
      const session = await getSession()
      if(session){
          let {data}=await axios.get(`${process.env.NEXT_PUBLIC_API}/store/get/profile?id=${session.user.id}`)
          setCart(data.user)
      }else{
      router.push("/")
      }
  }
  // if (cart.items.length === 0) {
  //   return (
  //     <div className={classes.container}>
  //       <h1>Your cart is empty</h1>
  //     </div>
  //   );
  // }
  return (
    <>
    <div className={classes.container}>
      <div className={classes.header}>
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total Price</p>
      </div>
      {cart.items && cart.items.map((item, index) => (
        <div key={index} className={classes.body}>
          <div className={classes.image} data-name="Image">
            <img
            width="90"
            height="90"
              src={item.image[0].url}
             alt={item.image[0].url}
            />
          </div>
          <div data-name="Name">
            {item.name}
            {item.color.name && <span>Color: {item.color.name}</span>}
            {item.attribute.name && (
              <span>{`${item.attribute.for}: ${item.attribute.name}`}</span>
            )}
          </div>
          <div data-name="Price">
            {settings.settingsData.currency.symbol}
            {parseInt(item.price)}
          </div>
          <div data-name="Quantity">{item.qty}</div>
          <div data-name="Total Price">
            {settings.settingsData.currency.symbol}
            {parseInt(item.qty * item.price)}
          </div>
        </div>
      ))}
      <div className={classes.card_container}>
        <div className={classes.card}>
          <p>Shipping Charges</p>
          <b>{settings.settingsData.currency.symbol}0</b>
        </div>
        <div className={classes.card}>
          <p>Sub Total</p>
          <b>
            {settings.settingsData.currency.symbol}
            {parseInt(getTotalPrice)}
          </b>
        </div>
        <div className={classes.card}>
          <p>Total (Incl. VAT)</p>
          <b>
            {settings.settingsData.currency.symbol}
            {parseInt(discountPrice)}
          </b>
        </div>
      </div>
      <div className="order-details">
        <div className="order-wrapper">
            <div className="order-status">
                <h4>Order Status</h4>
            </div>
            <div className="order-process">
                <ul className="list-unstyled">
                    <li className="green-strip">
                      <h4>Order Placed</h4>
                      <p>We have received Your Order</p>
                      <p>8/20/2022 1:22:15 PM</p>
                    </li>
                    <li className="green-strip">
                      <h4>Order Confirmed</h4>
                      <p>Your Order has been Confirmed</p>
                    </li>
                    <li className="green-strip">
                      <h4>Packed</h4>
                      <p>Your Order has been Packed</p>
                      <p>8/20/2022 1:23:41 PM</p>
                    </li>
                    <li className="grey-strip">
                      <h4>Dispatched</h4>
                      <p>Status Pending</p>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Orderstatus;
