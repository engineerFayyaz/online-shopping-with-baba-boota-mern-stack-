import Link from "next/link"

import { addToCart, addVariableProductToCart } from "../../../redux/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import customId from "custom-id-new";
import { useRouter } from "next/router";

const ProductListCat = ({ product, openModal }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const router = useRouter()
  const addItemToCart = () => {
    simpleProductCart(1)
    return true;
  }
  const simpleProductCart = (qty) => {
    const { _id, name, image, quantity, discount } = product;
    const existed = cartData.items.find((item) => item._id === _id);
    const totalQty = existed ? existed.qty + qty : qty;
    console.log(totalQty, qty, quantity)
    if (quantity >= totalQty) {
      const cartItem = {
        _id,
        uid: customId({ randomLength: 6 }),
        name,
        image,
        price: discount,
        qty,
        quantity,
        color: { name: null, value: null },
        attribute: { name: null, value: null, for: null },
      };
      console.log("cart", cartItem)
      dispatch(addToCart(cartItem));
      openModal(product.slug)
    } else {
      toast.error("This item is out of stock!");
    }
  };
  return (
    <li className="transall">
      <Link href={`/product/${product.slug}`}><a className="productLink"><span id="productCircle-17802"><span className="circle">
        {/* {
                product.discount_amount > 0 ?
                    <>
                        <img src="/img/badge.png" />
                        <span className="usp">
                            <div className="usp_1">
                                <span className="usp_off">{product.discount_amount}%{" "}off
</span>
                            </div>
                        </span>
                    </>
                    :
                    ""
            } */}

      </span></span><div className="image p-image">
          {
            product.image && (<img id="ProductImage-17802" productimage="/images/ProductImages/Products406x406/636989861984374996.jpg"
              src={product.image[0].url} alt="Multipurpose Cable Wire Clips Holder Grip 1PC - Black-SehgalMotors.Pk" className="img-responsive" />)
          }
        </div>
      </a></Link>


      <div onClick={() => { router.push(`/product/${product.slug}`) }} className="product-info mt__15">
        <h3 className="product-title pr fs__14 mg__0 fwm"><a class="cd chp" href="#">{product.name.slice(0, 20)}</a></h3>
        <span className="price dib mb__5">
          <ins>Rs.{parseInt(product.discount)}</ins>
          {
            product.discount_amount > 0 ?
              <div className="d-flex align-item-center flex-wrap flex-sm-nowrap flex-md-nowrap">
                <del>Rs. {parseInt(product.price)}</del><span className="save-amount">{parseInt(product.discount_amount)}% off</span>
              </div>
              :
              ""
          }
        </span>
      </div>

      <div className="icon_image">
        <input type="hidden" id="pProductSku-17802" defaultValue={17802} />
        <ul className="list-inline cartBtns">
          <li><a href="javascript:void(0)" onclick="QuickView(this)" quickproductid={17802}><img src="/images/search.png" className="img-responsive search_icon" /></a></li>
          <li><a href="javascript:void(0)" productid={17802} onClick={() => addItemToCart()} className="btn btn-cart-sm">Buy Now</a></li>
        </ul>
      </div>
    </li>
  )
}

export default ProductListCat