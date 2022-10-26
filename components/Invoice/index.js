import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "../../components/Checkout/checkout.module.css";
import { decimalBalance,postData } from "../../lib/clientFunctions";
import { toJpeg } from "html-to-image";

const Invoice = ({ data,invoiceRef }) => {
  console.log("data",data)
  const settings = useSelector((state) => state.settings);
  const currencySymbol = "PKR";

  useEffect(()=>{
    SendInvoice(invoiceRef?.current,data)
},[invoiceRef])

const SendInvoice=async(reference,orderData)=>{
  console.log("refe",reference)
  const { jsPDF } = await import("jspdf");
  await toJpeg(reference, { quality: 1.0, pixelRatio: 1.8 })
    .then(async function(dataUrl) {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, "FAST");
      const out = await pdf.output('datauristring');
      const url = `${process.env.NEXT_PUBLIC_API}/store/order/sendinvoice`;
      let data1={
        pdf: out.split('base64,')[1],
        email:orderData?.shippingInfo?.email,
        phone:orderData?.shippingInfo?.phone
      }
      console.log(out.split('base64,')[1])
      const response = await postData(url,data1);
     
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("fais",orderData)
}
console.log(data?.coupon)
  return (
   
    <div className={classes.confirmation}>
      <div className={classes.confirmation_heading}>
        {settings.settingsData.logo[0] && (
          <Image
            src={settings.settingsData.logo[0].url}
            width={166}
            height={60}
            alt={settings.settingsData.name}
          />
        )}
        <h2>We have received your order</h2>
        <h6>Order no# {data.orderId}</h6>
        {/* <p>A copy of your receipt has been send to {data.billingInfo.email}</p> */}
        <br />
      </div>
      <div className={classes.confirmation_body}>
        <h5>Delivery details</h5>
        <div className="row">
          <div className="col-md-6">
            <h6>Delivery for</h6>
            <p>{data?.billingInfo?.fullName}</p>
            <p>Phone no : {data?.billingInfo?.phone}</p>
            <br />
            <h6>Address</h6>
            <p>{`${data?.billingInfo?.house} ${data?.billingInfo?.state} ${data?.billingInfo?.zipCode} ${data?.billingInfo?.country}`}</p>
          </div>
          <div className="col-md-6">
            <h6>Delivery method</h6>
            <p>{data?.deliveryInfo?.type}</p>
            <br />
            <h6>Payment method</h6>
            <p>{data?.paymentMethod}</p>
          </div>
        </div>
        <h5>Order summary</h5>
        <div className={classes.cart_item_list}>
          {data?.products?.map((item, index) => (
            <div className={classes.cart_item} key={index}>
              <div className={classes.cart_container}>
                <span className={classes.cart_disc}>
                  <b>{item.name}</b>
                  {item.color.name && <span>Color: {item.color.name}</span>}
                  {item.attribute.name && (
                    <span>{`${item.attribute.for}: ${item.attribute.name}`}</span>
                  )}
                  <span>Qty: {item.qty}</span>
                  <span>
                    Price: {currencySymbol}
                    {parseInt(item.price)}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.confirmation_pay}>
          <div>
            <span>Sub Total</span>
            <span>
              {currencySymbol}
              {decimalBalance(data?.totalPrice)}
            </span>
          </div>
          <div>
            <span>Discount</span>
            <span>
              {currencySymbol}
              {decimalBalance(
                 (data?.coupon?.discount / 100) * (data?.totalPrice)
              )}
            </span>
          </div>
          <div>
            <span>Delivery Charge</span>
            <span>
              {currencySymbol}
              {data?.deliveryInfo?.cost}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>
              {currencySymbol}
              {decimalBalance((data?.totalPrice) - (data?.coupon?.discount / 100) * (data?.totalPrice))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
