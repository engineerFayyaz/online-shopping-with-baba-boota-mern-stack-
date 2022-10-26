import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../redux/productDetail.slice";
import { useRouter } from "next/router";




const ProductModal = () => {
    const { product } = useSelector((state) => state.productDetail);
    let router = useRouter()
    let dispatch = useDispatch()
    const closeModal = () => {
        dispatch(close(false))
        $('#myModal').modal("hide");

    }
    return (
        <>
            <div className="modal fadev ProductModal" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header modal_header">
                            <div className="media">
                                <div className="media-left">
                                    <img src="/images/check_icon2.png" alt="Check" />
                                </div>
                                <div className="media-body">
                                    <h4 className="modal-title header_title media-heading">Product added successfully to your cart!</h4>
                                </div>
                                <div className="media-right">
                                    <a href="#" className="btn btn-success close_button">
                                        <button type="button" className="close close_btn" onClick={() => { closeModal() }} data-dismiss="modal">×</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body modal_body AddToCartModal">
                            <div className="col-sm-12 col-md-5 col-lg-5">
                                <div className="image image_p">

                                    {
                                        product.discount_amount > 0 ?
                                            <span id="mSaleCircle" style={{ textAlign: 'center' }}>
                                                <span className="circle">
                                                    <img src="/img/badge.png" alt="circle" />
                                                    <span className="usp">
                                                        <div className="usp_1">
                                                            <span className="usp_off">
                                                                {product.discount_amount}%{" "}off
              </span>
                                                        </div>
                                                    </span>
                                                </span>
                                            </span>
                                            :
                                            ""
                                    }
                                    <span id="mBadge" style={{ textAlign: 'center' }} />
                                    {
                                        product ?
                                            <div className="qviewImg">
                                                {
                                                    product.image.length > 0 ?
                                                        <img id="mProductImage" src={product.image[0]?.url} alt="Product Image" className="img-responsive modalImage" />

                                                        :
                                                        ""
                                                }
                                            </div>
                                            : (<div className="mask loadingMask">
                                                <div className="loadingBox">
                                                    <div className="loading">
                                                        <img src="/images/loading.gif" alt="loading" />
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                    }

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-7 col-lg-7">
                                <div className="row">
                                    <div className="col-sm-12 col-md-7 col-lg-8">
                                        <div className="slider_bottomside">
                                            <p id="text">
                                            </p>
                                            <h4 id="mProductTitle" >
                                                {product.name}
                                            </h4>
                                            <p />
                                            <div className="p-price" id="mProductPrice" >
                                                {product.discount}
                                            </div>
                                        </div>
                                        <hr />
                                        <pre className="haq"><p><b><span className="pull-left">Shipping Cost</span> <span className="pull-right">Rs:<span id="ModalCartDeliveryTotal">0</span></span></b></p></pre>
                                        <pre className="haq"><p><b><span className="pull-left">Cart Total</span><span className="pull-right">Rs: <span id="ModalCartTotal">{product.discount}</span></span></b></p></pre>
                                        <pre className="haq"><p> <b>Free Shipping Over Rs. 1000 /-</b>{"\n"}</p></pre>
                                        <div className="clearfix" />
                                        <hr />
                                        <div className="row comentBoxes">
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <div className="box1">
                                                    <img src="/images/check_icon.png" alt="check" className="img-responsive check_icon" />
                                                    <p className="text1">
                                                        7 Days Money back Guarantee
                          </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <div className="box1">
                                                    <img src="/images/check_icon.png" alt="check" className="img-responsive check_icon" />
                                                    <p className="text1">
                                                        Authentic &amp; Reliable Products
                          </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4">
                                                <div className="box1">
                                                    <img src="/images/check_icon.png" alt="check" className="img-responsive check_icon" />
                                                    <p className="text1">
                                                        Fast Deliveries All Over Pakistan.
                          </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-popup">
                                            <ul className="list-inline btn_inline">
                                                <li><a href="javascript:void(0)" onClick={() => { closeModal(); setTimeout(() => { router.push("/cart") }, 1000) }} className="btn btn-view">View cart</a></li>
                                                <li><a href="javascript:void(0)" onClick={() => { closeModal(); setTimeout(() => { router.push("/checkout") }, 1000) }} className="btn btn-primary btn-check">Check out</a></li>
                                                <li><a href="javascript:void(0)" onClick={() => { closeModal(); }} className="btn btn-view">Continue shop </a></li>
                                            </ul>
                                        </div>
                                        <ul className="list-inline sm_icon">
                                            <li className="t_icon"><a href="#"><img src="/images/twitter_icon.png" alt="twitter" className="img-responsive" /></a></li>
                                            <li className="f_icon"><a href="#"><img src="/images/facebook_icon.png" alt="facebook" className="img-responsive" /></a></li>
                                            <li className="g_icon"><a href="#"><img src="/images/google_p_icon.png" alt="Google Plus" className="img-responsive" /></a></li>
                                            <li className="i_icon"><a href="#"><img src="/images/instagram_icon.png" alt="instagram" className="img-responsive" /></a></li>
                                            <li className="in_icon"><a href="#"><img src="/images/in_icon.png" alt="Linkedin" className="img-responsive" /></a></li>
                                            <li className="p_icon"><a href="#"><img src="/images/p_icon.png" alt="Pintrest" className="img-responsive" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductModal;