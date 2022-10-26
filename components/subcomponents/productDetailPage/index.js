import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart, addVariableProductToCart } from '../../../redux/cart.slice';
import customId from 'custom-id-new';
import renderHTML from 'react-render-html';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import StarRatings from 'react-star-ratings';
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './productDetail.module.css';
import ImageMagnifier from '../../imageMagnifier/inedx';
const { default: Script } = require('next/script');

const productDetail = ({ detail }) => {
  const { data: session, status } = useSession();
  let [rating, setRating] = useState(0);
  let [ShareProduct, setShareProduct] = useState(false);
  let [Copied, setCopied] = useState(false);
  let [like, setLike] = useState(false);
  let product = detail.product && detail.product[0];
  let [load, setload] = useState(false);
  const dispatch = useDispatch();
  let [tab, setTab] = useState('detail');
  let [quant, setQuant] = useState(1);
  let [phone, setPhone] = useState('');
  let [fav, setFav] = useState([]);
  let [reviewText, setReviewText] = useState('');
  const [open, setOpen] = useState(false);


  const [selectedColor, setSelectedColor] = useState({
    name: null,
    value: null,
  });
  const [selectedAttribute, setSelectedAttribute] = useState({
    name: null,
    value: null,
    for: null,
  });
  const [price, setPrice] = useState(0);

  const router = useRouter();
  console.log('det', detail);
  let related = detail.related;
  const cartData = useSelector(state => state.cart);
  console.log('rel', related);
  useEffect(() => {
    getFav();
    setTimeout(() => {
      setload(true);
    }, 3000);
  }, []);
  const getFav = async () => {
    if (session) {
      let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/get/profile?id=${session.user.id}`
      );
      if (data.user) {
        setFav(data.user.favorite);
      }
    }
  };
  const addItemToCart = () => {
    console.log('Aa', product.type);
    if (product.type == 'simple') {
      simpleProductCart(quant);
    } else if (product.type == 'variable') {
      variableProductCart(quant);
    }
    return true;
  };
  const variableProductCart = qty => {
    try {
      const { _id, name, image, colors, attributes, productId } = product;
      if (colors.length && !selectedColor.name) {
        toast.warning('Please Select Color!');
      } else if (attributes.length && !selectedAttribute.name) {
        toast.warning(`Please Select ${attributes[0].for}!`);
      } else {
        const existedProduct = cartData.items.find(
          item =>
            item._id === _id &&
            item.color.name == selectedColor.name &&
            item.attribute.name == selectedAttribute.name
        );
        const existedQty = existedProduct ? existedProduct.qty : 0;
        const variantData = checkVariantInfo(
          selectedColor.name,
          selectedAttribute.name
        );
        const qtyAvailable =
          variantData && checkQty(existedQty, qty, variantData.qty);
        if (qtyAvailable) {
          const cartItem = {
            _id,
            uid: customId({ randomLength: 6 }),
            name,
            product_id: productId,
            image,
            price: Number(price),
            qty,
            quantity: Number(variantData.qty),
            sku: variantData.sku,
            color: selectedColor.name
              ? { name: selectedColor.name, value: selectedColor.value }
              : { name: null, value: null },
            attribute: selectedAttribute.name
              ? {
                name: selectedAttribute.name,
                value: selectedAttribute.value,
                for: attributes[0].for,
              }
              : { name: null, value: null, for: null },
          };
          dispatch(addVariableProductToCart(cartItem));
          toast.success('Added to Cart');
        } else {
          console.log('variable');
          toast.error('This item is out of stock!');
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Something Went Wrong');
    }
  };
  const checkQty = (prevQty, currentQty, availableQty) => {
    const avQty = Number(availableQty);
    if (avQty === -1) {
      return true;
    } else {
      return prevQty + currentQty <= avQty;
    }
  };
  const simpleProductCart = qty => {
    const { _id, name, image, quantity, discount, productId } = product;
    const existed = cartData.items.find(item => item._id === _id);
    const totalQty = existed ? existed.qty + qty : qty;
    console.log(quantity >= totalQty);
    if (quantity >= totalQty) {
      const cartItem = {
        _id,
        uid: customId({ randomLength: 6 }),
        name,
        image,
        product_id: productId,
        price: discount,
        qty,
        quantity,
        color: { name: null, value: null },
        attribute: { name: null, value: null, for: null },
      };
      console.log('cart', cartItem);
      dispatch(addToCart(cartItem));
      toast.success('Added to Cart');
    } else {
      toast.error('This item is out of stock!');
    }
  };

  const TabsChange = dat => {
    console.log('dat', dat);
    setTab(dat);
  };
  const SendSuggestSms = () => {
    if (phone.length < 11) {
      toast.error('Please Enter Correct Phone Number');
    } else {
      let data = {
        phone: phone,
        link: `${process.env.NEXT_PUBLIC_URL}${router.asPath}`,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/store/share-category-page`, data)
        .then(res => {
          if (res.data == 'message sent') {
            toast.success('Send Successfully');
          }
        });
    }
  };
  const saveToWishlist = async id => {
    if (!session) {
      toast.error('Please login');
    } else {
      if (fav.some(user => user._id == product._id)) {
        let ap = {
          id: session.user.id,
          pid: id,
          exist: false,
        };
        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/store/store/wishlist`,
          ap
        );
        if (data.success == true) {
          setFav(data.user.favorite);
        }
      } else {
        let ap = {
          id: session.user.id,
          pid: id,
          exist: true,
        };
        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/store/store/wishlist`,
          ap
        );
        if (data.success == true) {
          setFav(data.user.favorite);
        }
      }
    }
  };
  const sharePrdctPopup = () => {
    setShareProduct(true);
  };
  const submitRating = async () => {
    if (!session) {
      toast.error('Please login');
    } else {
      try {
        let data = {
          id: product._id,
          user_id: session.user.id,
          rating: rating,
          comments: reviewText,
        };
        let res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/store/addrating/for/product`,
          data
        );
        toast.success('Review submit Successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
      setRating(0);
      setReviewText('');
    }
  };

  const changeColor = e => {
    try {
      const value = {
        name: e.target.getAttribute('data-color'),
        value: e.target.value,
      };
      setSelectedColor(value);
      console.log('val', value);
      const variantData = checkVariantInfo(value.name, null);
      console.log('var', variantData);
      if (variantData && variantData.price) {
        const itemPrice = Number(variantData.price);
        setPrice(itemPrice);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkVariantInfo = (color, attr) => {
    const colorName = color || selectedColor.name;
    const attrName = attr || selectedAttribute.name;
    console.log(attrName);
    return product.variants.find(
      item => item.color == colorName && item.attr == attrName
    );
  };

  const changeVariant = e => {
    try {
      const value = {
        name: e.target[e.target.selectedIndex].getAttribute('data-attr'),
        value: e.target.value,
        for: e.target[e.target.selectedIndex].getAttribute('data-tref'),
      };
      setSelectedAttribute(value);
      const variantData = checkVariantInfo(null, value.name);
      if (variantData && variantData.price) {
        const itemPrice = Number(variantData.price);
        setPrice(itemPrice);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getVideo = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API}/mobile/getvideo`);
    console.log('video function');
    setVideo(res.data);
    console.log(res.data, 'video');
  };
  useEffect(() => {
    getVideo();
  }, []);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false)
  return (
    <>
      <div className="container" id="single-product">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <nav className="header_area">
              <ul className="list-inline">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/led-lightening-accessories" id="haqBtn">
                    {' '}
                    {product && product.categories[0]}{' '}
                  </a>{' '}
                </li>
                <li>
                  <a
                    href="/led-lightening-accessories/dome-roof-smd-led"
                    id="haqBtn"
                  >
                    {product && product.subcategories[0]}
                  </a>{' '}
                </li>
                <li>{product && product.name}</li>
              </ul>
            </nav>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div id="main_area" className="productDetail">
          {/* Slider */}
          <div className="row">
            <div
              className="col-xs-12 col-sm-2 col-md-1 col-lg-1 main_slider"
              id="slider-thumbs"
            >
              {/* Bottom switcher of slider */}
              <ul className="hide-bullets list-group">
                {product?.gallery?.map((image, i) => {
                  return (
                    <li>
                      <a
                        className="thumbnail left_bar"
                        id={`carousel-selector-${i}`}
                      >
                        <img
                          id="ProductImage-18559"
                          src={image.url}
                          className=" img-responsive"
                        />
                      </a>
                    </li>
                  );
                })}

                <li className="vidlist">
                  <a href="#y_video">
                    <img
                      src="/images/play-icon.png"
                      className="img-responsive"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-10 col-md-5 col-lg-5">
              {load ? (
                <>
                  <div className="col-xs-12" id="slider">
                    {/* Top part of the slider */}
                    <div className="row">
                      <div
                        id="carousel-bounding-box"
                        className="carousel-bounding-box"
                      >
                        <span
                          id="productCircle-18559"
                          style={{ textAlign: 'center' }}
                        >
                          {product.discount_amount > 0 ? (
                            <span className="circle">
                              <img src="/img/badge.png" />
                              <span className="usp">
                                <div className="usp_1">
                                  <span className="usp_off">
                                    {product.discount_amount}% off
                                  </span>
                                </div>
                              </span>
                            </span>
                          ) : (
                              ''
                            )}
                        </span>
                        <div className="carousel slide" id="myCarousel">
                          {/* Carousel items */}
                          <div className="carousel-inner carousel_image">
                            <div
                              key={0}
                              className="item active"
                              data-slide-number={0}
                            >
                              <a
                                href="javascript:void(0)"
                                data-fancybox="group1"
                                data-type="image"
                                data-caption="Multi-Function LED Dome Roof SMD Light with Power Button Y-978"
                              >
                                {/* <img
                                  src={product.gallery[0]?.url}
                                  alt="Multi-Function LED Dome Roof SMD Light with Power Button Y-978-SehgalMotors.Pk"
                                  className="img-responsive 2"
                                /> */}
                                <ImageMagnifier src={product.gallery[0]?.url} />
                              </a>
                            </div>
                            {product.gallery.map((image, i) => {
                              if (i > 0)
                                return (
                                  <div
                                    key={i + 1}
                                    className="item "
                                    data-slide-number={i + 1}
                                  >
                                    <a
                                      href={image.url}
                                      data-fancybox="group1"
                                      data-type="image"
                                      data-caption={image.name}
                                    >
                                      <ImageMagnifier src={image.url} />
                                    </a>
                                  </div>
                                );
                            })}
                          </div>
                          {/* Carousel nav */}
                          <a
                            className="left carousel-control leftCarousel carousel-shadow"
                            href="#myCarousel"
                            role="button"
                            data-slide="prev"
                          >
                            <img
                              src="/images/less_than.png"
                              className="less_than"
                            />
                          </a>
                          <a
                            className="right carousel-control rightCarousel carousel-shadow"
                            href="#myCarousel"
                            role="button"
                            data-slide="next"
                          >
                            <img
                              src="/images/greather_than.png"
                              className="greather_than"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                  ''
                )}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 productDesc">
              <div className="slider_bottomside">
                <h3 className="product-title-d">{product.name}</h3>
                <p>
                  <b>SKU:</b> {product.sku}
                </p>
                <div
                  className="p-price"
                  id="ProductPrice-18559"
                  productprice="RS 1,500"
                >
                  <span
                    style={{ fontSize: '14px', color: 'gray', margin: '0px' }}
                  >
                    Now:{' '}
                    <span>
                      PKR {price == 0 ? parseInt(product.discount) : price}
                    </span>{' '}
                  </span>
                  <span className="sale" style={{ margin: '0px' }}>
                    <span
                      style={{
                        fontSize: '14px',
                        color: 'gray',
                        marginLeft: '0px',
                      }}
                    >
                      Was:
                    </span>
                    <s style={{ marginLeft: '10px' }}>
                      {product.discount_amount > 0
                        ? `Rs:${parseInt(product.price)}`
                        : ''}
                    </s>
                  </span>
                  <span style={{ fontSize: '14px', margin: '0px' }}>
                    {product.discount_amount > 0 ? (
                      <span className="save-amount" style={{ margin: '0px' }}>
                        {parseInt(product.discount_amount)}% off
                      </span>
                    ) : (
                        ''
                      )}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={onOpenModal}
                    style={{
                      backgroundColor: '#2b4cd7',
                      border: '1px solid #2bcd7',
                      marginBottom: "15px"
                    }}
                  >
                    How To Order
                  </button>
                  {
                    open && (
                      <div className="modelpopup">
                          <iframe  width="430" height="315" className='popu' src="https://www.youtube.com/embed/E21Ah2OaMLI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </div>
                    )
                  }


                </div>
              </div>
              {product.type === 'variable' && (
                <div>
                  {product.colors.length > 0 && (
                    <div className={classes.color_selector}>
                      <p
                        className={classes.section_heading}
                        style={{ marginBottom: '11px' }}
                      >
                        Color
                      </p>
                      <div className={classes.color_selector_container}>
                        {product.colors.map((color, i) => (
                          <div className={classes.circle_outer} key={i}>
                            <input
                              type="radio"
                              name="color"
                              style={{ color: "black" }}
                              value={color.value}
                              data-color={color.label}
                              onClick={changeColor}
                              title={color.name}
                            />
                            <label style={{ backgroundColor: color.value }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.attributes.length > 0 && (
                    <div>
                      <p className={classes.section_heading}>
                        {product.attributes[0].for}
                      </p>
                      <div className={classes.select}>
                        <select onChange={changeVariant} defaultValue="">
                          <option value="" disabled>
                            Select {product.attributes[0].for}
                          </option>
                          {product.attributes.map((attr, i) => (
                            <option
                              key={i}
                              value={attr.value}
                              data-attr={attr.label}
                              data-tref={attr.for}
                            >
                              {attr.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="box boxDec variations_form">
                <ul className="list-inline">
                  <li>
                    <div className="center">
                      <div className="quantity">
                        <input
                          type="text"
                          name="quant[1]"
                          value={quant}
                          className="input-text input-number value counterMain"
                          readOnly
                          defaultValue={1}
                          min={1}
                          max={100}
                        />

                        <div ClassName="qty">
                          <button
                            type="button"
                            className="tc minus-btn btn-number"
                            onClick={() => {
                              if (quant > 1) setQuant(quant - 1);
                            }}
                            data-type="minus"
                            data-field="quant[1]"
                          >
                            <span className="glyphicon glyphicon-minus" />
                          </button>
                          <button
                            type="button"
                            className="tc plus-btn btn-number"
                            onClick={() => {
                              setQuant(quant + 1);
                            }}
                            data-type="plus"
                          >
                            <span className="glyphicon glyphicon-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="button">
                  <button
                    className="btn btn-block btn-add-to-cart"
                    onClick={() => addItemToCart()}
                  >
                    ADD TO CART
                  </button>
                </div>
                <div className="whatsapp_button">
                  <a
                    target="_blank"
                    href={`https://api.whatsapp.com/send?phone=+923011155501&text=Hi,I want to order this product:${process.env.NEXT_PUBLIC_URL}/product/${product.slug}`}
                    style={{
                      backgroundColor: '#4caf50',
                      borderRadius: '20px 0 20px 0',
                    }}
                    className="btn btn-block btn-add-to-cart"
                  >
                    <img width="25px" src="/images/whatsapp-icon.png" /> Order
                    On WhatsApp
                  </a>
                </div>
              </div>
              {/* <p className="haq">Have a Question: &nbsp; &nbsp;<b><a href="tel:+923111222357">03111222357</a></b></p>
              <p className="haq">Ask a Specialist: &nbsp; &nbsp; &nbsp;<b><a href="javascript:void(0)" id="haqBtn"> Live Chat</a></b></p>
              <p className="haq">Availability at Retail Outlet: &nbsp; &nbsp;<b><a href="tel:+923111222357">Call to Confirm</a></b></p> */}
              <p className="haq">
                Category: &nbsp; &nbsp;
                <b>
                  <a href="/led-lightening-accessories" id="haqBtn">
                    {product.categories && product.categories[0]}
                  </a>
                  <span>, </span>
                  <a
                    href="/led-lightening-accessories/dome-roof-smd-led"
                    id="haqBtn"
                  >
                    {' '}
                    {product.subcategories && product.subcategories[0]}
                  </a>
                  <span>, </span>
                </b>
              </p>

              <ul className="list-inline">
                <li>Share with a Friend:</li>
                <li>
                  <input
                    className="sharewithfriend"
                    onChange={e => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    id="Phoneno"
                    placeholder="0333xxxxxxx"
                    pattern="[0-9]{11}"
                    style={{ borderRadius: '0px 0px 0px 0px' }}
                  />
                  <b>
                    <a
                      id="btnsnd"
                      onClick={() => SendSuggestSms()}
                      style={{ color: '#2b4cd7', cursor: 'pointer' }}
                      data-toggle="modal"
                      data-target="#modalSocial"
                    >
                      Send
                    </a>
                  </b>{' '}
                  &nbsp;{' '}
                  <span
                    className="glyphicon glyphicon-ok"
                    id="tickk"
                    style={{ display: 'none', color: 'green' }}
                  />
                </li>
              </ul>
              <div
                style={{ marginTop: '0px', marginBottom: '10px' }}
                className="product-rating"
              >
                <StarRatings
                  rating={product.avgRating}
                  starRatedColor="yellow"
                  isSelectable={false}
                  isAggregateRating="true"
                  starDimension="20px"
                  numberOfStars={5}
                  name="rating"
                  starSpacing="0px"
                />{' '}
                ({product.totalRating})
              </div>
              <ul className="list-inline">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      saveToWishlist(product._id);
                    }}
                  >
                    <img
                      style={{ width: '30px' }}
                      id="imagereplace"
                      src={
                        fav.some(user => user._id == product._id)
                          ? '/images/wishlist-selected.png'
                          : '/images/like-icon.png'
                      }
                    />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img
                      style={{ width: '30px' }}
                      onClick={() => {
                        sharePrdctPopup();
                      }}
                      src="/images/social-share.png"
                    />
                  </a>
                </li>
              </ul>
              <div className="daysbox">
                <div className="row">
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="box1">
                      <img
                        src="/images/returniconpng.png"
                        className="img-responsive check_icon"
                      />
                      <p className="text1">7 Days Return Under Conditions</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="box1">
                      <img
                        src="/images/easypaymenticon.png"
                        className="img-responsive check_icon"
                      />
                      <p className="text1">Easy and Secure Payments</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="box1">
                      <img
                        src="/images/genuineproducticon.png"
                        className="img-responsive check_icon"
                      />
                      <p className="text1">
                        Genuine <br /> Product
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <ul className="list-inline sm_icon">
                <li className="t_icon">
                  <a href="#">
                    <img
                      src="/images/twitter_icon.png"
                      className="img-responsive"
                    />
                  </a>
                </li>
                <li className="f_icon">
                  <a href="#">
                    <img
                      src="/images/facebook_icon.png"
                      className="img-responsive"
                    />
                  </a>
                </li>
                <li className="g_icon">
                  <a href="#">
                    <img
                      src="/images/google_p_icon.png"
                      className="img-responsive"
                    />
                  </a>
                </li>
                <li className="i_icon">
                  <a href="#">
                    <img
                      src="/images/instagram_icon.png"
                      className="img-responsive"
                    />
                  </a>
                </li>
                <li className="in_icon">
                  <a href="#">
                    <img src="/images/in_icon.png" className="img-responsive" />
                  </a>
                </li>
                <li className="p_icon">
                  <a href="#">
                    <img src="/images/p_icon.png" className="img-responsive" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 sideRelated">
              <h4 className="text-center">Related Products</h4>
              <div className="slider_rightside">
                <ul className="list-inline">
                  {related &&
                    related.map((rel, i) => {
                      if (i < 3)
                        return (
                          <li>
                            <a href={`/product/${rel.slug}`}>
                              <div className="image">
                                <img
                                  src={rel.image[0].url}
                                  alt="Car Atmosphere Ambient Multi Color Light With Remote For Interior - 7 Color"
                                  className="img-responsive"
                                />
                              </div>
                              <p>{rel.name.slice(0, 20)}</p>
                              <b>RS: {parseInt(rel.discount)}</b>
                            </a>
                          </li>
                        );
                    })}
                </ul>
              </div>
            </div>
          </div>
  
        </div>
      </div>
      <section id="space">
                    
      </section>
      <section className="back_area padd-tb-40" id="y_video">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 ">
              <div
                id="demoTab"
                style={{ display: 'block', width: '100%', margin: '0px' }}
              >
                <ul className="resp-tabs-list contentTabs brandTabs">
                  <li
                    className={`easy_resp_tab  resp-tab-item brandTabs ${
                      tab == 'detail' ? 'easy_tab resp-tab-active' : ''
                      }`}
                    onClick={() => {
                      TabsChange('detail');
                    }}
                    aria-controls="brandTabs_tab_item-0"
                    role="tab"
                    style={{
                      backgroundColor: 'rgb(228, 228, 228)',
                      borderColor: 'rgb(228, 228, 228)',
                    }}
                  >
                   PRODUCT DETAIL
                  </li>
                  
                  <li
                    className={`easy_resp_tab resp-tab-item brandTabs ${
                      tab == "features" ? "easy_tab resp-tab-active" : ""
                    }`}
                    onClick={() => {
                      TabsChange("features");
                    }}
                    aria-controls="brandTabs_tab_item-1"
                    role="tab"
                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                  >
                    PRODUCT VIDEOS
                  </li>

                  <li
                    className={`easy_resp_tab resp-tab-item brandTabs ${
                      tab == "review" ? "easy_tab resp-tab-active" : ""
                    }`}
                    onClick={() => {
                      TabsChange("review");
                    }}
                    aria-controls="brandTabs_tab_item-3"
                    role="tab"
                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                  >
                    REVIEWS
                  </li>
                </ul>
                <div className="resp-tabs-container brandTabs" style={{ borderColor: 'rgb(193, 193, 193)' }}>
                  
                  <div
                    className="resp_tab resp-tab-content brandTabs resp-tab-content-active"
                    aria-labelledby="brandTabs_tab_item-0"
                    style={{ display: tab == 'detail' ? 'block' : 'none' }}
                  >
                    <h2
                      style={{
                        display: 'block',
                        fontWeight: '700',
                        marginBottom: '6px',
                        fontSize: '1.1em',
                      }}
                    >
                      Description
                    </h2>
                    {product.description ? renderHTML(product.description) : ''}
                  </div>
                  <div
                    className="resp_tab resp-tab-content brandTabs"
                    aria-labelledby="brandTabs_tab_item-1"
                    style={{ display: tab == 'features' ? 'block' : 'none' }}
                  >
                    <h2></h2>
                    <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="videocapt">
                <div className="pull-left">
                  <span id="video-title">Product Video</span>
                </div>
                <div className="pull-right">
                  <a
                    href="#"
                    className="btn btn-line btn-default"
                    style={{ visibility: 'hidden' }}
                  >
                    All Videos
                  </a>
                </div>
              </div>
              <div className="sliderside">
                <div
                  id="myCarouselNew"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="false"
                >
                  {/* Indicators */}
                  {/* Wrapper for slides */}
                  <div className="carousel-inner video-inner" role="listbox">
                    <div className="item active">
                      <a href target="_blank">
                        <iframe
                          width="100%"
                          height="412px"
                          src={product.youtube_url}
                          frameBorder={0}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </div>
                  {/* Review tab */}
                  <div
                    className="resp_tab resp-tab-content brandTabs"
                    aria-labelledby="brandTabs_tab_item-3"
                    style={{ display: tab == 'review' ? 'block' : 'none' }}
                  >
                    <div className="rating-products ratings-details-page">
            <h4>Submit Reviews</h4>
            <div className="ratings-stars">
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                isAggregateRating="true"
                starHoverColor="yellow"
                starDimension="30px"
                numberOfStars={5}
                changeRating={rating => {
                  setRating(rating);
                }}
                name="rating"
                starSpacing="5px"
              />
            </div>
            <div className="write-review-msg">
              <textarea
                value={reviewText}
                onChange={e => {
                  setReviewText(e.target.value);
                }}
                rows={6}
              />
              <div className="text-center">
                <button
                  className="btn btn-default summary-actions-newreview"
                  onClick={submitRating}
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            
          </div>
        </div>
      </section>
      <section id="space">
                    
      </section>
      <section>
        <div className="container">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 sellerSec you-may-like">
            <h4 className="text-center">You may also love to buy it too</h4>
            <ul className="list-inline sellerProductList relatedBig p-hover product_list">
              {related &&
                related.map(productData => {
                  return (
                    <li className="transall item ">
                      <Link href={`/product/${productData.slug}`}>
                        <a>
                          <span id="productCircle-15525">
                            {/* 
                                                    {
                                                        productData.discount_amount > 0 ?
                                                            <span className="circle">
                                                                <img src="/img/badge.png" alt="circle" />
                                                                <span className="usp">
                                                                    <div className="usp_1">

                                                                        <span className="usp_off">
                                                                            {productData.discount_amount} %{" "}off
                                                              </span>
                                                                    </div>
                                                                </span>
                                                            </span>

                                                            :
                                                            ""
                                                    } */}
                          </span>
                          <div className="p-image">
                            {productData.image.length > 0 ? (
                              <img
                                id="ProductImage-15525"
                                productimage="images/636755560197151495.jpg"
                                src={productData.image[0]?.url}
                                alt="Dual Switch Button | Change Over Switch | Switch Allowing to Switch between Two Devices-SehgalMotors.Pk"
                                className="img-responsive"
                              />
                            ) : (
                                ''
                              )}
                          </div>
                        </a>
                      </Link>
                      <div
                        onClick={() => {
                          router.push(`/product/${productData.slug}`);
                        }}
                        className="product-info mt__15"
                      >
                        <h3 className="product-title pr fs__14 mg__0 fwm">
                          <a class="cd chp" href="#">
                            {productData.name.slice(0, 20)}
                          </a>
                        </h3>
                        <span className="price dib mb__5">
                          <ins>Rs.{parseInt(productData.discount)}</ins>
                          {productData.discount_amount > 0 ? (
                            <div className="d-flex align-item-center flex-wrap flex-sm-nowrap flex-md-nowrap">
                              <del>Rs. {parseInt(productData.price)}</del>
                              <span className="save-amount">
                                {parseInt(productData.discount_amount)}% off
                              </span>
                            </div>
                          ) : (
                              ''
                            )}
                        </span>
                      </div>
                      <Link href={`/product/${productData.slug}`}>
                        <a className="mask" />
                      </Link>
                      {/* <div className="cartBtn">
                                            <a href="javascript:void(0)" quickproductid={15525} className="btn btn-search" onclick="QuickView(this)"><img src="https://www.sehgalmotors.pk/images/icon-search-btn.png" alt="search" /></a>
                                            <a href="javascript:void(0)" productid={15525} onClick={() => openModal(productData.slug)} className="btn btn-cart-sm">Buy Now</a>
                                        </div> */}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div
          style={{ textAlign: 'center' }}
          className={ShareProduct ? 'popup active' : 'popup'}
          id="WishListDeletePopup"
        >
          <div className="popup_dialog dialog_review confirm_dialog">
            <div className="flex arange_cont confirm_cont">
              <p> Share To </p>
            </div>
            <FacebookShareButton
              url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
            >
              <FacebookIcon size={100} round={true} />
            </FacebookShareButton>{' '}
            <LinkedinShareButton
              url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
            >
              <LinkedinIcon size={100} round={true} />
            </LinkedinShareButton>{' '}
            <TwitterShareButton
              url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
            >
              <TwitterIcon size={100} round={true} />
            </TwitterShareButton>{' '}
            <WhatsappShareButton
              url={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
            >
              <WhatsappIcon size={100} round={true} />
            </WhatsappShareButton>
            <div>
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
                onCopy={() => setCopied(true)}
              >
                <button className="copyToClipBord">Copy to clipboard</button>
              </CopyToClipboard>
              {Copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </div>
            <div className="flex arange_cont confirm_action">
              <button
                className="btn review_btn share_review-btn"
                onClick={() => {
                  setShareProduct(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
      {load ? (
        <>
          <Script src="/js/owl.carousel.min.js" strategy="lazyOnload"></Script>

          <Script src="/js/common.js" strategy="lazyOnload" />
        </>
      ) : (
          ''
        )}
      <ToastContainer position="top-center" />
    </>
  );
};

export default productDetail;
