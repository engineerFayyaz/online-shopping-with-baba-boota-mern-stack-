import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GlobalLayout from '../components/Layout/GlobalLayout'
import BannerSlider from "../components/subcomponents/banner/bannerslider"
import Banner from "../components/subcomponents/banner/banner"
import Infocus from '../components/subcomponents/Infocus/Infocus.js';

import PopularCategories from "../components/subcomponents/popularCategories"
import RecommendedProducts from "../components/subcomponents/recommendedProducts"
import WomenFashion from "../components/subcomponents/womenFashion"
import MegaDeals from '../components/subcomponents/megaDeals'
import axios from "axios"
import { useRouter } from 'next/router'
import CategorysDeals from '../components/subcomponents/CategorysDeals'
import { useEffect ,useState} from 'react'
import TrendingNow from '../components/subcomponents/TrendingNow';
import BestSelling from '../components/subcomponents/BestSelling';
import NewArrival from '../components/subcomponents/NewArrival';


const Home = ({ banner, homeData,inFocus,newArrivals,deals }) => {

  let router=useRouter()
  return (
    <>
      <GlobalLayout>
        <div className="main main-home container-home-wrap py-0">

          <div onClick={()=>{router.push("/sale")}} className="h-sale-banner">
            <div className="row">
              <div className="col-md-12">
                <div className="h-sale-banner-wrap">
                  <img src={`${banner?.topsalebanner?.Images[0]?.url}`} />
                </div>
              </div>
            </div>
          </div>

          <BannerSlider banner={banner?.topslider} salebanner={banner?.sidesalebanner} />
          <PopularCategories categories={homeData.categories} />
          <Infocus 
            title="In Focus"
            title2="Mega deal of the day"
            title3="More reasons to shop"
            inFocus={inFocus}
            newArrivals={newArrivals}
            products={homeData.firstSectionProducts}
            bestSelling={homeData.newArrival} 
            deals={deals}
            
          />
          <NewArrival products={homeData.newArrival}
            title="New Arrival" />
          <RecommendedProducts
            products={homeData.recommendedProducts}
            title="Recommended for you" />
        
          <Banner banner={banner.firstsectionbanner} />

          <TrendingNow products={homeData.newArrival} 
            title="Trending Now"/>
            <BestSelling products={homeData.newArrival} 
            title="Best Selling"/>
<div className="main-banner-wrap">
            <div className="row">
              <div className="col-md-12">
                <div className="main-home-slideshow hello">
                  <div className="swiper homeslideshow">
                    <div className="swiper-wrapper">
                      {banner.middleslider.Images && banner.middleslider.Images.map((data) => {
                        return (
                          <div className="swiper-slide">
                            <img src={data.url} />
                          </div>
                        )
                      })}
                    </div>
                    <div className="swiper-button-next" />
                    <div className="swiper-button-prev" />
                    <div className="swiper-pagination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RecommendedProducts
            products={homeData.firstSectionProducts}
            title="Laptops & accessories" />
          {/* <Banner banner={banner.secondsectionbanner} /> */}
          
          <Banner banner={banner.thirdsectionbanner} />
        </div>
      </GlobalLayout>
    </>
  )
}



export async function getServerSideProps() {
  let res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/homebanner`)
  let res1 = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/homepage/data`)

  let resdata = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/infocus`);
  let resData1 = await axios.get(`${process.env.NEXT_PUBLIC_API}/mobile/newarrivals`);
  let resData2 = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/deals`);

  return { props: { banner: res.data, homeData: res1.data , inFocus: resdata.data,newArrivals : resData1.data ,deals:resData2.data} }
}

export default Home