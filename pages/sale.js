import GlobalLayout  from "../components/Layout/GlobalLayout"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductListCat from "../components/subcomponents/mainCollection/productListCat";
import { useState } from "react";



const Sale=({data})=>{
    let [products, setProducts] = useState(data?data:[])
    const [hasMore, setHasMore] = useState(true);
    const [PageNumber, SetPageNumber] = useState(2);

    const getMorePost = async () => {
        let res = null
      
            res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/saleproducts?page=${PageNumber}`)
        
       
        let newPosts = res.data
        setProducts((products) => [...products, ...newPosts]);
        SetPageNumber(PageNumber + 1)
    };
    return(
     <GlobalLayout>
            <input type="hidden" name="name" defaultValue="toyotaaaa" id="hdnSearch" />
            <section className="mainCatSection innercatbg" style={{ backgroundImage: 'url(/images/CategoryImages/Main/performance636300366829812126.png)', backgroundPosition: 'center left', backgroundColor: '#b83108' }}>
                <div className="main-overlay" style={{ backgroundColor: '#b83108', opacity: '0.5' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>Sale Products</h2>
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
                <div className="row">
                <div className="section_area subCatsArea" style={{ paddingTop: '20px' }}>

                <InfiniteScroll
                                    dataLength={products?.length}
                                    next={getMorePost}
                                    hasMore={hasMore}
                                    loader={""}
                                    endMessage={<h4>Nothing more to show</h4>}
                                >
                                    <ul className="list-inline subCatProducts" id="LoadMoreProductsEmbed">
                                        {
                                            products && products.map((product, i) => {
                                                return (
                                                    <ProductListCat  key={i} product={product} />
                                                )
                                            })
                                        }

                                    </ul>
                                </InfiniteScroll>
                    </div>
            </div>
            </div>

         </GlobalLayout>
    )
}

export async function getServerSideProps({query}) {
const url = process.env.NEXT_PUBLIC_API;
let response = await axios.get(`${url}/store/saleproducts?page=1`)


return { props:{
            data:response.data,
           
    } }
}

export default Sale