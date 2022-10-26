import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Login from '../login/index';
import { useRouter } from 'next/router';

const Header = props => {
  const { data: session, status } = useSession();
  let [items, setItems] = useState([]);
  let [cat, setCat] = useState([]);
  let [subCat, setSubCat] = useState(null);
  const cartData = useSelector(state => state.cart);

  let [searchString, setSearchString] = useState('');
  let router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  let getCategories = async () => {
    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/homepage/data`
      );
      console.log('aa');
      if (res.status == 200) {
        console.log('bb', res.data.categories);

        setCat(res.data.categories);
        setSubCat(res.data.categories[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    $(document).mouseup(function (e) {
      var container = $('.sidebarlogin');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('show-sidebar')) {
          $('body').removeClass('show-sidebar');
          $('body').find('.js-menu-toggle').removeClass('active');
        }
      }
    });
  }, []);
  const ClickSignin = () => {
    if ($('body').hasClass('show-sidebar')) {
      $('body').removeClass('show-sidebar');
    } else {
      $('body').addClass('show-sidebar');
    }
  };

  const handleOnSearch = async (string, results) => {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/store/search?terms=${string}`
    );
    setItems(data.products);
    setSearchString(string);
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };
  const handleOnHover = result => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = item => {
    router.push(`/product/${item.slug}`);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = item => {
    return (
      <>
        <div>
          <span>
            {item.image.length > 0 ? (
              <img
                src={item.image[0].url}
                style={{ width: '50px', height: '50px' }}
              />
            ) : (
              ''
            )}
          </span>
          <span id="{item.id}">{item.name}</span>
        </div>
      </>
    );
  };
  return (
    <>
      <header className="d-none d-sm-block">
        <div className="header-wrapper">
          <div className="header-middle">
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <div className="d-flex justify-content-between justify-content-md-start align-items-center flex-grow-1 flex-sm-grow-0 flex-md-grow-0">
                  <Link href="/">
                    <a className="brand-logo">
                      <img src="/img/bababoota-logo.png" />
                    </a>
                  </Link>
                </div>
                <div className="search-mixnav flex-grow-0 flex-sm-grow-1 flex-md-grow-1">
                  <div className="search-mix-top">
                    <div className="h_search_frm js_frm_search pr">
                      <div className="row no-gutters al_center">
                        <div className="frm_search_input pr oh col">
                          <ReactSearchAutocomplete
                            items={items}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            showIcon={false}
                            placeholder="Search Product"
                            styling={{
                              color: '#555',
                              backgroundColor: '#fff',
                              backgroundImage: 'none',
                              border: '0',
                              borderRadius: '20px 0 0 0 !important',
                              height: '38px',
                              boxShadow: 'none',
                              zIndex: '1',
                            }}
                            formatResult={formatResult}
                          />{' '}
                        </div>
                        <div className="frm_search_cat col-auto h_search_btn_wrap">
                          <button
                            disabled={searchString.length == 0}
                            onClick={() => {
                              router.push(
                                `/search?ProductName=${searchString}`
                              );
                            }}
                            className="h_search_btn js_btn_search"
                          >
                            <img src="/img/search-h.png" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h_btn-group">
                  <div className="d-flex justify-content-end align-items-center">
                    {!session ? (
                      <div
                        onClick={ClickSignin}
                        className="d-flex align-items-center justify-content-center h_cart_t h-login"
                      >
                        <a
                          href="#"
                          className="d-flex justify-content-center align-items-center js-menu-toggle menu-toggle"
                        >
                          <div className="account-icon-h">
                            <img src="/img/account-icon.png" />{' '}
                          </div>{' '}
                          <span>Sign In</span>
                        </a>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h_cart_t h-login">
                        <Link href="/my-account">
                          <a className="d-flex justify-content-center align-items-center js-menu-toggle menu-toggle">
                            <div className="account-icon-h">
                              <img src="/img/account-icon.png" />{' '}
                            </div>{' '}
                            <span>My Account</span>
                          </a>
                        </Link>
                      </div>
                    )}

                    <div
                      onClick={() => {
                        router.push('/cart');
                      }}
                      className="h_cart_t cart-basket"
                    >
                      <a
                        href="javascript:void(0)"
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div className="add-shop-icon-h">
                          <img src="/img/add-to-plus-icon.png" />
                          <span id="cartCounts">{cartData.items.length}</span>
                        </div>
                        <span>Shop</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navigation">
            <div className="search-mix-bottom">
              <div className="main-navigation-wrap">
                <div className="maincategoriesclass">
                  <div className="trigger">
                    <a href="#">All Categories</a>
                    <div className="menu">
                      <div className="category">
                        {cat &&
                          cat.map(data => {
                            return (
                              <span
                                onMouseOver={() => {
                                  setSubCat(data);
                                }}
                                onClick={() => {
                                  router.push(`/${data.slug}`);
                                }}
                                className={
                                  subCat?._id == data?._id ? 'selected' : ''
                                }
                              >
                                <a href="javascript:void(0)">{data.name}</a>
                              </span>
                            );
                          })}
                      </div>
                      <div className="detail">
                        <div className="details-inner">
                          <ul>
                            <li className="active">
                              <div className="topBar">{subCat?.name}</div>
                              <div className="subCats">
                                <div className="column">
                                  <div className="subtitle">Most Popular</div>
                                  <div className="list">
                                    {subCat?.subCategories?.map(data => {
                                      console.log(data, 'Data category');
                                      return (
                                        <Link
                                          href={`/${subCat.slug}/${data.slug}`}
                                        >
                                          <a>{data.name}</a>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                                {/* <div className="column">
                                  <div className="subtitle">Top Brands</div>
                                  <div className="list">
                                    <a href="#">Samsung</a>
                             
                                  </div>
                                </div> */}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      {cat &&
                        cat.map((data, i) => {
                          if (i <= 10)
                            return (
                              <li className="nav-item dropdown">
                                <Link href={`/${data.slug}`}>
                                  <a
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {data.name}
                                  </a>
                                </Link>

                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="navbarDropdown"
                                >
                                  <div className="container">
                                    <div className="row">
                                      {data.subCategories?.map(subcat => {
                                        return (
                                          <div className="col-md-3">
                                            <ul className="nav flex-column">
                                              <li className="nav-item">
                                                <Link
                                                  href={`${data.slug}/${subcat.slug}`}
                                                >
                                                  <a className="nav-link active">
                                                    {subcat.name}
                                                  </a>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                        })}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Login ClickSignin={ClickSignin} />
    </>
  );
};

export default Header;
