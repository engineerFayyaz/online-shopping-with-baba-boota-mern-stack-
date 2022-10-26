import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axios } from "axios";
import { fetchData, postData } from "../../../lib/clientFunctions";
import { FontSize } from "@styled-icons/boxicons-regular";

const Infocus = ({
  title,
  title2,
  title3,
  inFocus,
  newArrivals,
  products,
  bestSelling,
  deals,
}) => {
  const [newArrivalsData, setNewArrivalsData] = useState(newArrivals);
  const [recommendedProducts, setRecommendedProducts] = useState(products);
  const [bestSellingProducts, setBestSellingProducts] = useState(bestSelling);



  const router = useRouter();
  console.log("deals",deals)
  return (
    <>
      <div id="infocus">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="m-box">
                <div>
                  <h4 style={{ marginBottom: "10px" }}>{title}</h4>
                </div>
                <div className="focus-product">
                  <div className="focus-wrapper">
                    <div className="row" id="m-focus-data">
                    {inFocus &&
                      inFocus.slice(0, 4).map(data => {
                        return (
                          <div className="col-lg-6 f-box">
                              <figure
                            style={{ margin: "10px 0px",cursor:"pointer    " }}
                            onClick={() => {
                              router.push(`/infocus/${data.discount_amount}`);
                            }}>
                            <img
                              src={data.image && data.image[0].url}
                              width="150px"
                            />
                            <h6>Up to {data.discount_amount}% Off</h6>
                            <p style={{ fontSize: "15px", fontWeight: "600" }}>
                              Limited Time Deals
                            </p>
                          </figure>
                          </div>
                          
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="m-box">
                <div>
                  <h4 style={{ marginBottom: "10px" }}>{title2}<span style={{color: "red", marginLeft: "20px"}}>⏰24 hours only!</span></h4>
                </div>
                <div className="focus-product">
                  <div className="focus-wrapper">
                    <div className="row">
                    {deals &&
                      deals.slice(0, 4).map(data => {
                        const nameProduct = data.name.slice(0, 20).toUpperCase();
                        return (
                          <div className="col-lg-6 f-box">
                              <a onClick={() => { router.push(`/product/${data.slug}`) }} >
                            <figure>
                              <img
                                src={data.image && data.image[0].url}
                                width="130px"
                              />
                              <h6>{nameProduct}</h6>
                              <p>
                                <s style={{ color: "red" }}>{data.price}</s>
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    marginRight: "3px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}>
                                  {data.discount}&#8360;
                                </span>
                              </p>
                            </figure>
                          </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="m-box">
                <div>
                  <h4 style={{ marginBottom: "10px" }}>{title3}</h4>
                </div>
                <div className="focus-product">
                  <div className="focus-wrapper">
                    <div className="row" style={{ display: "flex" }}>
                      <div className="reasontoshop">
                        {newArrivalsData &&
                          newArrivalsData.slice(0, 1).map(data => {

                            return (
                              <>
                                <figure
                                  onClick={() => router.push("/promotion")}
                                  style={{ cursor: "pointer" }}>
                                  <img
                                    src={data.image && data.image[0].url}
                                    width="130px"
                                  />
                                  <h4>New Arrivals</h4>
                                  <p>
                                    Stay Uptodate
                                  </p>
                                </figure>
                              </>
                            );
                          })}
                      </div>
                      <div className="reasontoshop">
                        {recommendedProducts &&
                          recommendedProducts.slice(0, 1).map(data => {
                            return (
                              <>
                                <figure
                                  onClick={() => router.push("/recommended")}
                                  style={{ cursor: "pointer" }}>
                                  <img
                                    src={data.image && data.image[0].url}
                                    width="130px"
                                  />
                                  <h4>Recommeded</h4>
                                  <p>
                                    Best Prices
                                  </p>
                                </figure>
                              </>
                            );
                          })}
                      </div>
                    </div>
                    <div className="row" style={{ display: "flex" }}>
                      <div className="reasontoshop">
                        {bestSellingProducts &&
                          bestSellingProducts.slice(0, 1).map(data => {
                            console.log(data, "data");
                            return (
                              <>
                                <figure
                                  onClick={() => router.push("/bestselling")}
                                  style={{ cursor: "pointer" }}>
                                  <img
                                    src={data.image && data.image[0].url}
                                    width="130px"
                                  />
                                  <h4>Best Selling</h4>
                                  <p>
                                    Most Popular Picks
                                  </p>
                                </figure>
                              </>
                            );
                          })}
                      </div>
                      <div className="reasontoshop">
                        {deals &&
                          deals.slice(0, 1).map(data => {
                            console.log(data, "data");
                            return (
                              <>
                                <figure
                                  onClick={() => router.push("/bestdeals")}
                                  style={{ cursor: "pointer" }}>
                                  <img
                                    src={data.image && data.image[0].url}
                                    width="130px"
                                  />
                                  <h4>Best Deals</h4>
                                  <p>
                                    Stay Uptodate
                                  </p>
                                </figure>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Infocus;
