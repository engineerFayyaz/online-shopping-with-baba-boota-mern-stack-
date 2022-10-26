import { useEffect, useState } from "react"
import { useRouter } from "next/router";


const Categories=({categories})=>{

  let router=useRouter()
  useEffect(()=>{
      new Swiper(".smallcategoriesSwiper", {
        slidesPerView: "9",
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
  },[])


    return(
        <div className="popular-categories-wrap py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="swipper-slideshow-wrap">
                <div className="small-showcase-cat categoriesSwiper-wrap">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">     
                        <div className="swiper smallcategoriesSwiper">
                          <div className="swiper-wrapper">
                            {
                              categories && categories.map((data,i)=>{
                         
                                return(
                                  <div className="swiper-slide">

                                  <div onClick={()=>{router.push(`/${data.slug}`)}}  className="pc-cat-box">
                                    <a href="javascript:void(0)">
                                      <div className="top-cat-img">
                                        <div className="top-image-wrap">
                                          <img src={data.icon[0].url} />
                                        </div>
                                      </div>
                                    </a>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Categories