import React from "react";
import Header from "../../components/subcomponents/header";
import Footer from "../../components/subcomponents/footer";
import { useState, useEffect } from "react";
import axios from "axios";
// import  {setString} from "../../utils/setSTRING"
import moment from "moment";
import { useRouter } from "next/router";
import StarRatings from 'react-star-ratings';

const Recommeded = () => {
  const [pData, setPData] = useState([]);

  const getFocusData = async () => {
    const fData = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/homepage/data`
    );
    setPData(fData.data.firstSectionProducts);
  };

  useEffect(() => {
    getFocusData();
  }, []);

  return (
    <>
      <Header />
      <section id="permotionPage" >
        <div className="permotionPage-wrapper">
          <div className="container">
            <div className="row" id="custom-permotion">
              <div className="col-lg-12">
                <div className="permotionBanner">
                  <h3>Recommended</h3>
                </div>
              </div>
            </div>
            <div className="row" style={{margin: "30px 0px"}}>
              <div className="col-lg-12">
                <div className="permotional-Products">
                  <div className="row">
                  <h3 style={{marginLeft: "30px"}}>Recommended</h3>
                    {pData &&
                      pData.map((data, i) => (
                        <div className="col-lg-3">
                          <div className="product-inner pr">
                            <div className="product-image pr oh lazyloadt4sed">
                              <a className="db" href={`/product/${data.slug}`}>
                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloadt4sed">
                                  <picture>
                                    <img
                                      src={data.image && data.image[0].url}
                                      className="lazyautosizes lazyloadt4sed"
                                    />
                                  </picture>
                                </div>
                              </a>
                            </div>
                            <div className="product-info mt__15">
                              <h3
                                data-toggle="tooltip"
                                data-placement="top"
                                title={data.name}
                                className="product-title pr fs__14 mg__0 fwm"
                              >
                                <a className="cd chp" href="#">
                                  {data.name}
                                </a>
                              </h3>
                              <span
                                style={{ paddingLeft: "0px" }}
                                className="price dib mb__5"
                              >
                                <ins>
                                  <sapn class="pkr">RS:&nbsp;</sapn>
                                  <strong>{parseInt(data.discount)}</strong>
                                </ins>
                                {data.discount_amount > 0 ? (
                                  <div className="d-flex align-item-center flex-wrap flex-sm-nowrap flex-md-nowrap">
                                    <del>Rs. {parseInt(data.price)}</del>
                                    <span className="save-amount">
                                      {parseInt(data.discount_amount)}% off
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </span>
                              <div className="arrives-date">
                                <span>
                                  Arrives,{" "}
                                  <strong>
                                    {moment()
                                      .add(5, "days")
                                      .format("ddd MMMM DD")}
                                  </strong>
                                </span>
                              </div>
                              <div className="product-rating">
                                {/* <img src="img/product-rating.png" /> */}
                                <StarRatings
                                  rating={data.avgRating}
                                  starRatedColor="Yellow"
                                  isSelectable={false}
                                  isAggregateRating="true"
                                  starDimension="20px"
                                  numberOfStars={1}
                                  name="rating"
                                  starSpacing="0px"
                                />{" "}
                                ({data.totalRating})
                                <div>
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {data.avgRating &&
                                      data.avgRating.toFixed(1)}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Recommeded;
