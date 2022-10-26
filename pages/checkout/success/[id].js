import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from "../../../components/Checkout/checkout.module.css";
import axios from "axios";
import GlobalLayout from "../../../components/Layout/GlobalLayout";
import { fetchData } from "../../../lib/clientFunctions";
import useSWR from "swr";

const CheckoutNav = dynamic(() => import("../../../components/Checkout/checkoutNav"));
const Invoice = dynamic(() => import("../../../components/Invoice"));


const OrderSuccessPage = ({idData}) => {
  const [orderData, setOrderData] = useState({});
  const invoiceRef = useRef(null);
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API}/store/order/find?id=${idData}`;
  const { data, error } = useSWR(idData ? url : null, fetchData);
console.log("data",data)
  useEffect(() => {
    if (data && data.order) {
      setOrderData(data.order);
    }
  }, [data]);
  // useEffect(() => {
  //   if (data && data.order) {
  //     setOrderData(data.order);
  //   }
  // }, [data]);

  async function printDoc(params) {
    const { printDocument } = await import("../../../lib/clientFunctions");
    await printDocument(invoiceRef.current, `Invoice #${orderData.orderId}`);
  }
  return (
     <GlobalLayout>
        <div className={classes.top}>
          <CheckoutNav tab={6} />
          <div className={classes.card}>
            <div>
              <div ref={invoiceRef}>
                <Invoice invoiceRef={invoiceRef} data={orderData} />
              </div>
              <div className="py-2">
                <div className="row">
                  <div className="col-md-6">
                    <button className="mt-3" onClick={printDoc}>
                      Download Invoice
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link href="/" passHref>
                      <button className="mt-3">Continue Shopping</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </GlobalLayout>
  );
};
export async function getServerSideProps({query}) {
  let {id}=query



  return { props:{
                  idData:id
                 
          } }
}

export default OrderSuccessPage;
