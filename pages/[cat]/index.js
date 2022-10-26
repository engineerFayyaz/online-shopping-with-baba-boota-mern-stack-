import MainCollection from "../../components/subcomponents/mainCollection"
import axios from "axios"
import GlobalLayout from "../../components/Layout/GlobalLayout"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
// import JavascriptLoader from "../../components/subcomponents/javascriptLoader/index.js"




const Cat=({catProducts,brandsData,cat})=>{
    let [data,setData]=useState(null)
      useEffect(()=>{
          setData(catProducts)
      },[cat])
    return(
<>
<GlobalLayout>
<MainCollection data={data} brandsData={brandsData} IsSubcat={true} />
</GlobalLayout>

{/* <JavascriptLoader /> */}
</>
    )
}
export async function getServerSideProps({query}) {
    let {cat,subcat}=query
    const url = process.env.NEXT_PUBLIC_API;
    let response = await axios.get(`${url}/store/category_products?name=${cat}&page=1`)
    let response2 = await axios.get(`${url}/cars/all-brands`)

  
    return { props:{
                    catProducts:response.data,
                    brandsData:response2.data,
                    cat
                   
            } }
  }

export default Cat