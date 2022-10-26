import GlobalLayout from "../../components/Layout/GlobalLayout";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductListCat from "../../components/subcomponents/mainCollection/productListCat";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Blog = () => {
  let [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [PageNumber, SetPageNumber] = useState(2);
  useEffect(async () => {
    const url = process.env.NEXT_PUBLIC_API;
    let response = await axios.get(`${url}/mobile/getblogs?page=1`);
    setProducts(response.data?.blogs);
  }, []);
  const getMorePost = async () => {
    let res = null;

    res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/mobile/getblogs?page=${PageNumber}`
    );

    let newPosts = res.data?.blogs;
    setProducts((products) => [...products, ...newPosts]);
    SetPageNumber(PageNumber + 1);
  };
  return (
    <GlobalLayout>
      <input
        type="hidden"
        name="name"
        defaultValue="toyotaaaa"
        id="hdnSearch"
      />
      {/* <section className="mainCatSection innercatbg" style={{ backgroundImage: 'url(/images/CategoryImages/Main/performance636300366829812126.png)', backgroundPosition: 'center left', backgroundColor: '#b83108' }}>
                <div className="main-overlay" style={{ backgroundColor: '#b83108', opacity: '0.5' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>Sale Products</h2>
                        </div>
                    </div>
                </div>
            </section> */}
      <div className="container" id="blogs">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <nav className="header_area">
              <ul className="list-inline">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Blogs</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row">
          <div
            className="section_area subCatsArea"
            style={{ paddingTop: "20px" }}
          >
            <InfiniteScroll
              dataLength={products?.length}
              next={getMorePost}
              hasMore={hasMore}
              loader={""}
              endMessage={<h4>Nothing more to show</h4>}
            >
              <ul
                className="list-inline subCatProducts"
                id="LoadMoreProductsEmbed"
              >
                {products &&
                  products.map((product, i) => {
                    return (
                      <li className="transall">
                        <Link href={`/blogs/${product.slug}`}>
                          <a className="productLink">
                            <span id="productCircle-17802">
                              <span className="circle"></span>
                            </span>
                            <div className="image p-image">
                              {product.image && (
                                <img
                                  id="ProductImage-17802"
                                  productimage="/images/ProductImages/Products406x406/636989861984374996.jpg"
                                  src={`${process.env.NEXT_PUBLIC_URL}/${product.image}`}
                                  alt="Multipurpose Cable Wire Clips Holder Grip 1PC - Black-SehgalMotors.Pk"
                                  className="img-responsive"
                                />
                              )}
                            </div>
                          </a>
                        </Link>

                        <div
                          onClick={() => {
                            router.push(`/blogs/${product.slug}`);
                          }}
                          className="product-info mt__15"
                        >
                          <h3 className="product-title pr fs__14 mg__0 fwm">
                            <a class="cd chp" href="#">
                              {product.name.slice(0, 35)}
                            </a>
                          </h3>
                        </div>

                        <div className="icon_image">
                          <input
                            type="hidden"
                            id="pProductSku-17802"
                            defaultValue={17802}
                          />
                          <ul className="list-inline cartBtns">
                            <li>
                              <a
                                href="javascript:void(0)"
                                onclick="QuickView(this)"
                                quickproductid={17802}
                              >
                                <img
                                  src="/images/search.png"
                                  className="img-responsive search_icon"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0)"
                                productid={17802}
                                onClick={() => addItemToCart()}
                                className="btn btn-cart-sm"
                              >
                                Buy Now
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

// export async function getServerSideProps({query}) {
// const url = process.env.NEXT_PUBLIC_API;
// let response = await axios.get(`${url}/mobile/getblogs?page=2`)

// console.log(url)
// return { props:{
//             data:response.data,

//     } }
// }

export default Blog;
