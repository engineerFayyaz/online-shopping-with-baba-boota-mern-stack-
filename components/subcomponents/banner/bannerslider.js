import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const HomeCrousel=({banner,salebanner})=>{
  let router =useRouter()
  console.log("banner")
  useEffect(()=>{
    new Swiper(".homeslideshow", {
        slidesPerView: "1",
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

},[])
    return(
<>
<div className="main-banner-wrap">
          <div className="row">
            <div className="col-md-8">
              {/* Main Banner Start*/}
              <div className="main-home-slideshow hello">
                <div className="swiper homeslideshow">
                  <div className="swiper-wrapper">
                    {banner.Images && banner.Images.map((data)=>{
                      return(
                        <div className="swiper-slide"><img src={data.url} /></div>
                      )
                    })}
                  </div>
                  <div className="swiper-button-next" />
                  <div className="swiper-button-prev" />
                  <div className="swiper-pagination" />
                </div>
              </div>
              {/* Main Banner End */}
            </div>
            <div onClick={()=>{router.push("/sale")}} className="col-lg-4 d-none d-md-block p0">
              <div className="main-banner-newarrival2">
                <div className="mb-newarrival-brand2">
                  <img src={`${salebanner?.Images[1]?.url}`} />
                  <img src={`${salebanner?.Images[0]?.url}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default HomeCrousel