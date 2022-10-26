import { useRouter } from "next/router";
import SearchResultNotFound from "../components/subcomponents/searchResultNotFound";
import { useState, useEffect } from "react";
import axios from "axios"
import ProductListCat from "../components/subcomponents/mainCollection/productListCat";
import { useDispatch } from "react-redux";
import {addDetail,open} from "../redux/productDetail.slice";
import { ToastContainer, toast } from 'react-toastify'
import GlobalLayout from "../components/Layout/GlobalLayout";

const Search = () => {
let [searchFind,setSearchFind]=useState(true)
let [categories,setCategories]=useState(null)
let [products,setProducts]=useState(null)


    let router = useRouter()
    useEffect(() => {
        getSearchData()
      }, [router.query.ProductName])

   let getSearchData=async()=>{
    const url = process.env.NEXT_PUBLIC_API;
    // axios.get(`${url}/store/categories`).then((response) => {
    //   setCategories(response.data)
    // })
    let {data} = await axios.get(`${url}/store/search?terms=${router.query.ProductName}`)
    if(data && data.products.length>0){
        setProducts(data.products)

    }else{
        setSearchFind(false)
    }
   }

      const dispatch = useDispatch();

      const openModal=async(id)=>{
          const url = process.env.NEXT_PUBLIC_API;
          let response = await axios.get(`${url}/store/product_detail?slug=${id}`)
            if(response.data){
                dispatch(addDetail(response.data.product[0]))
                dispatch(open(true)) 
                $('#myModal').modal("show");
  
            }
      }
    
    return (
        <>
        <GlobalLayout>
            <input type="hidden" name="name" defaultValue="toyotaaaa" id="hdnSearch" />
            <section className="mainCatSection innercatbg" style={{ backgroundImage: 'url(/images/CategoryImages/Main/performance636300366829812126.png)', backgroundPosition: 'center left', backgroundColor: '#b83108' }}>
                <div className="main-overlay" style={{ backgroundColor: '#b83108', opacity: '0.5' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>Search<small>Search Result for ({router.query.ProductName})</small></h2>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <nav className="header_area">
                            <ul className="list-inline">
                                <li><a href="/">Home</a></li>
                                <li><a href="#">Shop</a></li>
                                <li>Search</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="clearfix" />
            <section className="productListing">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <hr />
                        </div>
                        <div className="col-sm-4 col-md-2">
                            <div className="panel-group category_group" id="accordion">
                                <ul className="categoryList list-unstyled sideList">
                                    {
                                        categories && categories.map((data,i)=>{
                                            return(
                                                <li key={i}>
                                                <a href={`/${data.slug}`}>
                                                    <div className="media">
                                                        <div className="media-left">
                                                        </div>
                                            <div className="media-body">{data.name}</div>
                                                    </div>
                                                </a>
                                            </li>
                                            )
                                        })
                                    }
                                 
                                
                                </ul>
                            </div>
                        </div>
                        {
                            searchFind ?
                            <div className="col-sm-8 col-md-10">
                            <div className="section_area subCatsArea">
                                <ul className="list-inline subCatProducts">
                               
                                 {
                                     products && products.map((data)=>{
                                         return(
                                          <ProductListCat openModal={openModal}  product={data}  />   
                                         )
                                     })
                                 }
                                </ul>
                            </div>
                        </div>
                            :
                            <SearchResultNotFound searchName={router.query.ProductName} />
                        }
                       
                    </div>
                </div>
            </section>
            <style jsx>{`
       .search-result h4 {
        margin: 0px;
        font-size: 30px;
        color: #0a263c;
        font-weight: bold;
    }
    .search-result p {
        padding: 0 !important;
        font-size: 20px;
        color: #3d6611;
    }
    .item-request{
        margin-top: 20px;
    }
    .item-request .media-left img {
        width: 80px;
    }
    .item-request .media-body p {
        font-size: 18px;
        width: 600px;
        margin: 5px;
    }
    .item-request .media-body label {
        font-size: 18px;
        margin-top: 5px;
    }
      `}</style>
      </GlobalLayout>
        </>
    )
}

export default Search;