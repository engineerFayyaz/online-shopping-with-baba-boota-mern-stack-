import React from "react";
import Header from "../../components/subcomponents/header";
import Footer from "../../components/subcomponents/footer";

import axios from "axios";

import InFocusProducts from "../../components/subcomponents/inFocusProducts";

const Infocus = ({products}) => {
  

  return (
    <>
      <Header />
      <InFocusProducts products={products}/>
      <Footer />
    </>
  );  
};
export async function getServerSideProps({query}) {
    let {price}=query
    console.log(price,"query");
    const url = process.env.NEXT_PUBLIC_API;
    let response = await axios.get(`${url}/store/getinfocus/detail?price=${price}`)
  
    return { props:{
                    products:response.data,                   
            } }
  }
export default Infocus;