import { useState } from "react";
import axios from "axios"
import GlobalLayout from "../../components/Layout/GlobalLayout"
import renderHTML from "react-render-html";





const BlogDetail=({data})=>{
 let [product,setProduct]=useState(data?.blog)

   
    return(
    <>
    <GlobalLayout>
    <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <nav className="header_area">
                            <ul className="list-inline">
                                <li><a href="/">Home</a></li>
                                <li>Blogs</li>
                            </ul>
                        </nav>
                    </div>
                </div>
        
        
        <div className="col-lg-8" id="singleProduct">
            <figure>
                <img src={`${process.env.NEXT_PUBLIC_URL}/${product.image}`} />
            </figure>
            <div className="Desc">
            {product.description ? renderHTML(product.description) : ""}
            </div>
        </div>
        <div className="col-lg-4">
            
        </div>
        </div>
        </GlobalLayout>
    </>
    )
}
export async function getServerSideProps({query}) {
    let slug=query.slug
    
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API}/mobile/getblog/${slug}`)
        return { props: { data: res.data } }
    


  }
export default BlogDetail