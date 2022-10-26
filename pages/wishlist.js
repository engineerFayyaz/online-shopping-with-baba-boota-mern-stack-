
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios"
import ProductListCat from "../components/subcomponents/mainCollection/productListCat";
import { useDispatch } from "react-redux";
import { addDetail, open } from "../redux/productDetail.slice";
import { ToastContainer, toast } from 'react-toastify'
import GlobalLayout from "../components/Layout/GlobalLayout";
import { useSession, getSession } from "next-auth/react"


const WishList = () => {
    let [searchFind, setSearchFind] = useState(true)
    let [categories, setCategories] = useState(null)
    let [products, setProducts] = useState([])
    const { data: session, status } = useSession()


    let router = useRouter()
    useEffect(() => {

        getWishListData()
    }, [])

    let getWishListData = async () => {
        const session = await getSession()

        const url = process.env.NEXT_PUBLIC_API;
        if (session) {
            let { data } = await axios.get(`${url}/users/get/wishlist?id=${session.user.id}`)
            if (data && data.user) {
                setProducts(data.user.favorite)

            }
        } else {
            router.push("/")
        }

    }

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
    console.log(products)
    return (
        <GlobalLayout>
            <input type="hidden" name="name" defaultValue="toyotaaaa" id="hdnSearch" />
            <section className="mainCatSection innercatbg" style={{ backgroundImage: 'url(/images/CategoryImages/Main/performance636300366829812126.png)', backgroundPosition: 'center left', backgroundColor: '#000' }}>
                <div className="main-overlay" style={{ backgroundColor: '#000', opacity: '1' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>WishList</h2>
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
                                <li><a href="#">WishList</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="clearfix" />
            {
                products.length == 0 ?
                    <div className="order-product" id="AllTwoOrders">
                        <div>
                            <div className="flex arange_cont empty_order">
                                <span>WishList Empty</span>
                            </div>
                        </div>
                    </div>
                    :
                    <section className="productListing">

                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <hr />
                                </div>


                                <div className="col-sm-12 col-md-12">
                                    <div className="section_area subCatsArea">
                                        <ul className="list-inline subCatProducts">

                                            {
                                                products && products.map((data) => {
                                                    return (
                                                        <ProductListCat openModal={openModal} product={data} />
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>
            }

        </GlobalLayout>
    )
}

export default WishList