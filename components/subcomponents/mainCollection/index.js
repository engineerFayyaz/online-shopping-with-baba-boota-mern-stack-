import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import ProductListCat from "./productListCat";
import { useSelector, useDispatch } from "react-redux";
import ProductModal from "../productModal";
import { addDetail, open } from "../../../redux/productDetail.slice";
import { ToastContainer, toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const { Range } = Slider;

const MainCollection = ({ IsSubcat, data, brandsData }) => {
    const { isOpen } = useSelector((state) => state.productDetail);
    const [hasMore, setHasMore] = useState(true);
    const [PageNumber, SetPageNumber] = useState(2);
    let [phone, setPhone] = useState("")
console.log("check",data)
    const dispatch = useDispatch();
    const openModal = async (id) => {
        const url = process.env.NEXT_PUBLIC_API;
        let response = await axios.get(`${url}/store/product_detail?slug=${id}`)
        if (response.data) {
            dispatch(addDetail(response.data.product[0]))
            dispatch(open(true))
            $('#myModal').modal("show");

        }
    }

  const [upperBound, setUpperBound] = useState([20, 1000]);
  let valueBound = [10, 400];
  let [products, setProducts] = useState([]);
  let [lowprice, setlowprice] = useState(0);
  let [highprice, sethighprice] = useState(0);

  let [filters, setFilters] = useState({
    subcategory: [],
    brands: [],
    size: null,
    dropfilter: null,
  });
  const router = useRouter();
  console.log("data", products);

  useEffect(() => {
    setProducts(data?.categories);
  }, [data]);

  useEffect(() => {
    FilterChange();
  }, [filters]);

  const FilterChange = () => {
    let str = "";
    if (filters.subcategory.length > 0) {
      str += `&subcategory=${JSON.stringify(filters.subcategory)}`;
    }
    if (filters.brands.length > 0) {
      str += `&brands=${JSON.stringify(filters.brands)}`;
    }
    if (filters.size) {
      str += `&size=${filters.size}`;
    }
    if (filters.dropfilter == "lowtohigh") {
      str += `&sortyByLow=${filters.dropfilter}`;
    }
    if (filters.dropfilter == "hightolow") {
      str += `&sortyByHigh=${filters.dropfilter}`;
    }
    if (filters.dropfilter == "newarrivals") {
      str += `&newarrivals=${filters.dropfilter}`;
    }
    if (lowprice >= 0 && highprice > 0) {
      str += `&lowprice=${lowprice}&highprice=${highprice}`;
    }
    FiltersApi(str);
  };

  const FiltersData = (name, filter) => {
    let subcat = filters.subcategory;
    let brands = filters.brands;
    if (name == "subcat") {
      if (subcat.includes(filter)) {
        console.log("1");

        subcat = subcat.filter((value, i) => {
          return value !== filter;
        });
      } else {
        subcat.push(`${filter}`);
      }

      setFilters({
        ...filters,
        subcategory: subcat,
      });
    }
    if (name == "brand") {
      if (brands.includes(filter)) {
        brands = brands.filter((value, i) => {
          return value !== filter;
        });
      } else {
        brands.push(`${filter}`);
      }

      setFilters({
        ...filters,
        brands: brands,
      });
    }
    if (name == "size") {
      setFilters({
        ...filters,
        size: filter,
      });
    }
  };

  const FiltersApi = (strng) => {
    if (IsSubcat) {
      let str = `?name=${router.query.cat}`;
      str += strng;
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/store/category_products${str}`)
        .then((res) => {
          let resp = res.data.categories && res.data.categories;
          let pro = resp;
          setProducts(pro);
        });
    }
    if (IsSubcat == false) {
      let str = `?name=${router.query.subcat}`;
      str += strng;
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/store/subcategory_products${str}`)
        .then((res) => {
          let resp = res.data.categories && res.data.categories;
          let pro = resp;
          setProducts(pro);
        });
    }
  };

  const getMorePost = async () => {
    let res = null;
    if (IsSubcat) {
      let str = `?name=${router.query.cat}`;
      if (filters.subcategory.length > 0) {
        str += `&subcategory=${JSON.stringify(filters.subcategory)}`;
      }
      if (filters.brands.length > 0) {
        str += `&brands=${JSON.stringify(filters.brands)}`;
      }
      if (filters.size) {
        str += `&size=${filters.size}`;
      }
      if (filters.dropfilter == "lowtohigh") {
        str += `&sortyByLow=${filters.dropfilter}`;
      }
      if (filters.dropfilter == "hightolow") {
        str += `&sortyByHigh=${filters.dropfilter}`;
      }
      if (filters.dropfilter == "newarrivals") {
        str += `&newarrivals=${filters.dropfilter}`;
      }
      if (lowprice >= 0 && highprice > 0) {
        str += `&lowprice=${lowprice}&highprice=${highprice}`;
      }
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/category_products?name=${str}&page=${PageNumber}`
      );
    }
    if (IsSubcat == false) {
      let str = `?name=${router.query.subcat}`;
      if (filters.subcategory.length > 0) {
        str += `&subcategory=${JSON.stringify(filters.subcategory)}`;
      }
      if (filters.brands.length > 0) {
        str += `&brands=${JSON.stringify(filters.brands)}`;
      }
      if (filters.size) {
        str += `&size=${filters.size}`;
      }
      if (filters.dropfilter == "lowtohigh") {
        str += `&sortyByLow=${filters.dropfilter}`;
      }
      if (filters.dropfilter == "hightolow") {
        str += `&sortyByHigh=${filters.dropfilter}`;
      }
      if (filters.dropfilter == "newarrivals") {
        str += `&newarrivals=${filters.dropfilter}`;
      }
      if (lowprice >= 0 && highprice > 0) {
        str += `&lowprice=${lowprice}&highprice=${highprice}`;
      }
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/subcategory_products?name=${str}&page=${PageNumber}`
      );
    }
    let newPosts = res.data.categories;
    setProducts((products) => [...products, ...newPosts]);
    SetPageNumber(PageNumber + 1);
  };
  const SendSuggestSms = () => {
    if (phone.length < 11) {
      toast.error("Please Enter Correct Phone Number");
    } else {
      let data = {
        phone: phone,
        link: `${process.env.NEXT_PUBLIC_URL}${router.asPath}`,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/store/share-category-page`, data)
        .then((res) => {
          if (res.data == "message sent") {
            toast.success("Send Successfully");
          }
        });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <nav className="header_area">
              <ul className="list-inline">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>{router.query.cat}</li>
                {IsSubcat == false ? <li>{router.query.subcat}</li> : ""}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <hr style={{ margin: "0px" }} />
      <section className="productListing">
        <div className="custom-container">
          <div className="row">
            <div className="col-sm-4 col-md-3" id="Sidebarfilter">
              <div className="shareFriend">
                <span>Share with a friend:</span>

                <div>
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    id="Phoneno"
                    placeholder="0333xxxxxxx"
                    style={{
                      width: "78%",
                      border: "1px solid #5555",
                      borderRadius: "0",
                      marginTop: "20px",
                      padding: "10px",
                    }}
                  />{" "}
                  <b>
                    <a
                      id="btnsnd"
                      type="button"
                      disabled={phone.length < 11}
                      onClick={() => SendSuggestSms()}
                    >
                      Send
                    </a>
                  </b>
                  <span id="tickk" />
                </div>
              </div>
              <div className="FilterPrice">
                <div className="pricewrapper">
                  <span>Price (PKR)</span>
                  <div>
                    <input
                      onChange={(e) => {
                        setlowprice(parseInt(e.target.value));
                      }}
                      type="text"
                      placeholder="500"
                    />
                    <span
                      style={{
                        margin: "0px 12px",
                        fontWeight: "400",
                        fontsize: "12px",
                      }}
                    >
                      TO
                    </span>
                    <input
                      onChange={(e) => {
                        sethighprice(parseInt(e.target.value));
                      }}
                      type="text"
                      placeholder="10000"
                    />
                    <a
                      href="javascript:void(0)"
                      onClick={FilterChange}
                      style={{ margin: "0px 12px", fontWeight: "600" }}
                    >
                      GO
                    </a>
                  </div>
                </div>
              </div>
              <div className="panel panel-default category_default">
                <div className="panel-heading category_heading">
                  <h4 className="panel-title">
                    <a>
                      <span className="glyphicon"></span>Brands
                    </a>
                  </h4>
                </div>
                <div id>
                  <div className="panel-body category_body">
                    <ul className="categoryList list-unstyled sideList brand ">
                      {brandsData &&
                        brandsData.map((brand, i) => {
                          return (
                            <li>
                              <label>
                                <input
                                  type="checkbox"
                                  onClick={(e) => {
                                    FiltersData("brand", e.target.value);
                                  }}
                                  className="Selectbrand"
                                  name="name"
                                  value={brand._id}
                                />
                                {brand.name}
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              {IsSubcat && (
                <div className="panel panel-default category_default">
                  <div className="panel-heading category_heading">
                    <h4 className="panel-title">
                      <a>
                        <span className="glyphicon"></span>Sub Category
                      </a>
                    </h4>
                  </div>
                  <div id>
                    <div className="panel-body category_body">
                      <ul className="categoryList list-unstyled sideList brand">
                        <li>
                          {data?.subcategories &&
                            data?.subcategories.subCategories.map((subCat) => {
                              return (
                                <label>
                                  <input
                                    type="checkbox"
                                    onClick={(e) => {
                                      FiltersData("subcat", e.target.value);
                                    }}
                                    className="subcategory"
                                    value={subCat.slug}
                                    name="name"
                                  />{" "}
                                  {subCat.name}
                                </label>
                              );
                            })}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <div id="PriceFilter" style={{ marginTop: "30px" }}>
                <div className="pricewrapper">
                  <span>Filter By Size</span>
                  <div>
                    <select defaultValue=""  onClick={(e) => {
                                      FiltersData("size", e.target.value);
                                    }}>
                      <option value="">Select size</option>
                      <option value="Small">SM</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-md-9 col-lg-9">
              <div className="filters d-flex">
                <div></div>
                <div className="d-flex left-box" style={{ width: "36%" }}>
                  <span>SORT BY</span>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      setFilters({ ...filters, dropfilter: e.target.value });
                    }}
                  >
                    <option value="">RECOMMENDED</option>
                    <option value="hightolow">Price: High to Low</option>
                    <option value="lowtohigh">Price: Low to High</option>
                    <option value="newarrivals">New Arrivals</option>
                  </select>
                </div>
                <div className="d-flex right-box" style={{ width: "30%" }}>
                  <span>DISPLAY</span>
                  <select>
                    <option>50 PER PAGE</option>
                    <option>100 PER PAGE</option>
                    <option>150 PER PAGE</option>
                  </select>
                </div>
              </div>
              <div
                className="section_area subCatsArea"
                style={{ paddingTop: "0px" }}
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
                          <ProductListCat
                            openModal={openModal}
                            key={i}
                            product={product}
                          />
                        );
                      })}
                  </ul>
                </InfiniteScroll>
                <div className="button2" id="loadMorebtn"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container" style={{ padding: '20px 0px 50px' }}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-offset-1 col-lg-10">
                            <p>All of the people out there hire interior decorators for homes and that is a good choice, but what to do when your car’s interior is at stake?</p>
                            <p>Well don’t you worry, SehgalMotors.PK is going to provide you with our bulk of car interior accessories from which you can choose. We assure you the Car Interior items that we have showcased here are of premium quality. Our hardworking team updates the Interior products every now and then to bring you the awesome products that you will want to purchase as soon as you lay eyes on them.</p>
                            <p>We offer Seat Covers with different styles and of different materials, Arm rests &amp; Console Boxes, Seat Belt Clips, LED Lights to gleam over the insides of your automobile with eye-catching colors, Car Tissue Boxes, Sun Shades to keep the sun out of your eyes and to stop your automobile from becoming a moving oven, Dashboard Carpets, Interior Mats &amp; Non-slip Mats, Regular Car Mats, Hangings, Back Care &amp; Accessories, Car Ashtrays, Gear Shift Knobs for the perfect grip, Trunk Mats, Floor Mats and the list the of products goes on with many other products to be up for sale in the future.</p>
                            <p>While driving choose the best for your comfort, or your family’s, and the best is what SehgalMotors.PK provides; you have our guarantee.</p>
                        </div>
                    </div>
                </div> */}
      </section>
      {isOpen && <ProductModal />}
      <ToastContainer />
    </>
  );
};

export default MainCollection;
