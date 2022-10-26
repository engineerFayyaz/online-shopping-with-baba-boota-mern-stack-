
import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react"
import GlobalLayout from "../components/Layout/GlobalLayout";
import axios from "axios";
import moment from "moment"


const Dashboard = () => {
    const router = useRouter()
    let [section, setSection] = useState("AllOrderSection")
    let [orders, setorders] = useState([])

    const cart = useSelector((state) => state.cart);
    const { data: session, status } = useSession()
    let [user, setUser] = useState({})

    useEffect(() => {
      
        $('#orderTabs').owlCarousel({
            items: 3,
            margin: 10,
            nav: false,
        });
        getProfile()
    }, [])
    const getProfile = async () => {
        const session = await getSession()
        if (session) {
            let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/get/profile?id=${session.user.id}`)
            let res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/get/orders/user?id=${session.user.id}`)
           if(res.data.success){
             setorders(res.data.user.orders)
           }
            setUser(data.user)
        } else {
            router.push("/")
        }
    }
    const changeSection = (name) => {
        setSection(name)
    }
    return (
        <GlobalLayout>
            <section className="top-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <section className="flex arange_cont prof_style prof_sec dashboard_prof" onclick="Redirection('EditProfile?ID=99680')">
                                <div className="pos_rel prof_img">
                                    <div className="img">
                                        <img src="/images/Dummyprofileimage.jpg" />
                                    </div>
                                </div>
                                <div className="prof_name">
                                    <span>{user.firstname}{" "}{user.lastname}</span>
                                </div>
                            </section>
                            <div className="cus-info">
                                <ul className="list-inline text-center">
                                    <li>
                                        <Link href="/track-shipment">
                                            <a>
                                                <div className="cus-info-img">
                                                    <img src="images/tracking-icon.png" />
                                                    <h4>Tracking</h4>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/wishlist">
                                            <a >
                                                <div className="cus-info-img">
                                                    <img src="images/wishlist-icon.png" />
                                                    <h4>Wish List</h4>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                    {/*  <li>
                                        <a href="javascript:void(0)" className="coupen-detail">
                                            <div className="cus-info-img">
                                                <img src="images/coupon-icon.png" />
                                                <h4>Coupen</h4>
                                            </div>
                                        </a>
                                    </li>
                                   <li>
                                        <a href="javascript:void(0)" onclick="Redirection('Wallet?ID=99680')">
                                            <div className="cus-info-img">
                                                <img src="images/wallet-icon.png" />
                                                <h4>Wallet</h4>
                                            </div>
                                        </a>
                                    </li> */}
                                    <li onclick="loaderIn()">
                                        <Link href="/edit-profile">
                                            <a>
                                                <div className="cus-info-img">
                                                    <img src="/images/profile-icon.png" />
                                                    <h4>Profile</h4>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={async () => { await  signOut({ redirect: false }); router.push("/");localStorage.removeItem("CART"); }} >
                                            <div className="cus-info-img">
                                                <img src="images/wallet-icon.png" />
                                                <h4>Log Out</h4>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="order-history">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="order-list">
                                <h4>Orders</h4>
                                {/* <div className="order_tab-sec">
                                    <ul className="list-inline owl-carousel" id="orderTabs">
                                        <li className={section=="AllOrderSection"? "tablinks active" :"tablinks"} id="AllOrder" onClick={()=>changeSection('AllOrderSection')}>All Order <span>(0)</span></li>
                                        <li className={section=="HoldSection"?"tablinks active": "tablinks "} id="hold" onClick={()=>changeSection('HoldSection')}>Hold <span>(0)</span></li>
                                        <li className={section=="ConfirmedSection"?"tablinks active": "tablinks" }id="confirmed" onClick={()=>changeSection( 'ConfirmedSection')}>Confirmed <span>(0)</span></li>
                                        <li className={section=="CancelledSection"?"tablinks active": "tablinks" }id="cancelled" onClick={()=>changeSection('CancelledSection')}>Cancelled <span>(0)</span></li>
                                        <li className={section=="PackedSection"?"tablinks active": "tablinks" }id="packed" onClick={()=>changeSection('PackedSection')}>Packed <span>(0)</span></li>
                                        <li className={section=="DispatchedSection"?"tablinks active": "tablinks" }id="dispatched" onClick={()=>changeSection('DispatchedSection')}>Dispatched<span>(0)</span></li>
                                        <li className={section=="ReturnedSection"?"tablinks active": "tablinks" }id="returned" onClick={()=>changeSection('ReturnedSection')}>Returned <span>(0)</span></li>
                                        <li className={section=="DeliveryFailedSection"?"tablinks active": "tablinks" }id="deliveryFailed" onClick={()=>changeSection('DeliveryFailedSection')}>Delivery Failed <span>(0)</span></li>
                                        <li className={section=="PaidSection"?"tablinks active": "tablinks" }id="paid" onClick={()=>changeSection('PaidSection')}>Paid <span>(0)</span></li>
                                    </ul>
                                    <div className="back_ground" />
                                    <div className="back_ground background_left" />
                                </div> */}
                            </div>
                            <div id="AllOrderSection" style={{ display: 'block' }} className="tabcontents">
                               {
                                   orders.length ==0 ?
                                   <div className="order-product" id="AllTwoOrders">
                                   <div>
                                       <div className="flex arange_cont empty_order">
                                           <img src="images/empty_order.png" alt="" />
                                           <span>No Order History</span>
                                       </div>
                                   </div>
                               </div>
                                   :
                                   
                                       orders?.map((or,i)=>{
                                           return(

                                            <div key={i} className="order-product" id="AllOrders" style={{ display: 'block' }}>

                                            <div className="order-product" id="AllTwoOrders">
                                                <div className="flex media">
                                                    <div className="media-left">
                                                        <figure>
                                                            <img src={`${or?.products[0]?.image[0]?.url}`} alt="" />
                                                        </figure>
                                                    </div>
                                                    <div className="media-right">
                                                        <div className="flex arange_cont title_price">
                                                            <div className="product-title">
                                           <h4>Order placed against ID: {or.orderId}</h4> </div>
                                           <div className="price_sec"> <span>Rs. {parseInt(or.totalPrice)}</span> </div>
                                                        </div>
                                                        <div className="flex arange_cont date_orderLoc">
                                                            <div className="flex arange_cont order_date"> <img src="img/calender_icon.png" alt="" />
                                           <p> <span>{moment(or.orderDate).format('ddd MMMM DD')}</span> </p>
                                                            </div>
                                                            {/* <div className="flex arange_cont order_date"> <img src="img/order_location.png" alt="" />
                                                                <p>Order: <span>Online</span> </p>
                                                            </div> */}
                                                        </div>
                                                        <div className="flex arange_cont order_des">
                                                            <div className="flex arange_cont order_detail prdct_count">
                                                                <p className="item_head">Products in order</p>
                                           <p className="item_count"> <span>{or.products?.length}</span> Products </p>
                                                            </div>
                                                            <div className="flex arange_cont order_detail status_detail">
                                                                <p className="item_head">Status</p>
                                                                <p className="item_count"> <span>{or.status}</span> </p>
                                                            </div>
                                                            <div className="flex arange_cont order_detail order_btn">
                                                                <a href="javascript:void(0)" onClick={()=>{router.push("/track-shipment")}} className="NotDispatched">
                                                                    <button>
                                                                        <p> <img src="img/track_icon.png" alt="" /> </p> Track </button>
                                                                </a>
                                                            </div>
                                                            {/* <div className="flex arange_cont order_detail">
                                                                <a href="javascript:void(0)">
                                                                    <button className="detail_btn">
                                                                        <p> <img src="img/detail_icon.png" alt="" /> </p> Detail </button>
                                                                </a>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                           )
                                       })
                                   
                                
                               }
                               
                               
                            </div>

                            {/*#endregion Delivery Faile dSection*/}
                        </div>
                    </div>
                </div>
            </section>
        </GlobalLayout>
    )
}

export default Dashboard;