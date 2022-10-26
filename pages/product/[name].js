import ProductDetail from "../../components/subcomponents/productDetailPage"
import axios from "axios";
import GlobalLayout from "../../components/Layout/GlobalLayout";

const ProductDetailPage=({detail})=>{
console.log("ddd",detail)
  return(
    <>
    <GlobalLayout>
   <ProductDetail detail={detail} />
   </GlobalLayout>
   </>
  )
}

export async function getServerSideProps({query}) {
  let {name}=query
  const url = process.env.NEXT_PUBLIC_API;
  let response = await axios.get(`${url}/store/product_detail?slug=${name}`)

  return { props:{
                  detail:response.data,                   
          } }
}
export default ProductDetailPage