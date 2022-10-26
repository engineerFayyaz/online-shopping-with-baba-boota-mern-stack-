import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StarRatings from 'react-star-ratings';
import moment from "moment"
import  {setString} from "../../../utils/setSTRING"



const RecommendedProducts = ({ title, products }) => {

  const router = useRouter()
  useEffect(() => {
    new Swiper(".categoriesSwiper", {
      slidesPerView: 6,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

  }, [])

  return (
    <>
    <div className="slide-showcase-products categoriesSwiper-wrap bg-creamy">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="title mb-4 mb-sm-4">
              {title}
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="swiper categoriesSwiper">
              <div className="swiper-wrapper">
                {
                  products && products.map((data, i) => {
                    return (
                      <div className="swiper-slide" key={i} onClick={() => { router.push(`/product/${data.slug}`) }}>
                        <div className="product-inner pr">
                          <div className="product-image pr oh lazyloadt4sed">
                            <a className="db" href={`/product/${data.slug}`}>
                              <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloadt4sed">
                                <picture>
                                  <img src={data.image && data.image[0].url} className="lazyautosizes lazyloadt4sed" />
                                </picture>
                              </div>
                            </a>
                            {
                              data.bestSelling ?
                                <div className="badge toltip-bg">
                                  <span>Best Sellers</span>
                                </div>
                                :
                                ""
                            }

                          </div>
                          <div className="product-info mt__15">
                            <h3  
                            data-toggle="tooltip" data-placement="top" title={data.name}
                            className="product-title pr fs__14 mg__0 fwm">
                          <a className="cd chp" href="#">{setString(data.name?.trim())}</a>
                            </h3>
                            <span style={{ paddingLeft: "0px" }} className="price dib mb__5">
                              <ins><sapn class="pkr">RS:&nbsp;</sapn><strong>{parseInt(data.discount)}</strong></ins>
                              {
                                data.discount_amount > 0 ?
                                  <div className="d-flex align-item-center flex-wrap flex-sm-nowrap flex-md-nowrap">
                                    <del>Rs. {parseInt(data.price)}</del><span className="save-amount">{parseInt(data.discount_amount)}% off</span>
                                  </div>
                                  :
                                  ""
                              }
                            </span>
                            <div className="arrives-date">
                              <span>Arrives, <strong>{moment().add(5, 'days').format('ddd MMMM DD')}</strong></span>
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
                                name='rating'
                                starSpacing="0px"
                              />
                              {" "}
                            ({data.totalRating})
                            <div>
                              <p style={{ fontSize: "14px", fontWeight: "400" }}>{data.avgRating && data.avgRating.toFixed(1)} </p>
                            </div>
                             </div>
                            
                          </div>
                        </div>
                      </div>

                    )
                  })
                }

              </div>
              <div className="swiper-button-next" />
              <div className="swiper-button-prev" />
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default RecommendedProducts