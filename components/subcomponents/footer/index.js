const { default: Link } = require("next/link")




const Footer = () =>{
return(
  <footer>
  <div className="main-footer">
    <div className="footer-top">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="w-help text-uppercase text-center text-sm-start">
              <h4>We're Always Here To Help</h4>
              <p>Reach out to us through any of these support channels</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="help-info">
              <ul className="d-flex align-items-center justify-content-center flex-wrap">
                <li>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="iconbox emailbox">
                      <img src="/img/mainbox-icon.png" />
                    </div>
                    <span>info@bababoota.com</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="iconbox callbox">
                      <img src="/img/phone-icon.png" />
                    </div>
                    <span>+92-30-111-555-01</span>
                  </div>                        
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-mid">
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="footer-content-box">
              <h2 className="foot-title">CUSTOMER CARE:</h2>
              <div className="navlist">
                <ul>
                  <li>
                    <Link href="/faq">
                    <a>FAQ</a>
                    </Link>                    
                    </li>
                  <li>
                  <Link href="/about-us">
                  <a>About Us</a>
                    </Link>
                    </li>
                    <li>
                  <Link href="/blogs">
                  <a>Blogs</a>
                    </Link>
                    </li>
                  <li>
                  <Link href="/contactus">
                  <a>Contact Us</a>
                    </Link>
                    </li>
                  <li>
                  <Link href="/career">
                  <a>Careers</a>
                    </Link>
                    </li>
                  <li>
                  <Link href="/track-shipment">
                  <a>Track your order</a>
                    </Link>
                    </li>
                  <li>
                  <Link href="/terms-conditions">
                  <a>Terms of Service</a>
                    </Link>
                    </li>
                  <li>
                  <Link href="/refunds-policy">
                  <a>Refund policy</a>
                    </Link>
                    </li>
                </ul>
              </div>
            </div>                
          </div>
          <div className="col-md">
            <div className="footer-content-box">
              <h2 className="foot-title">OUR POLICIES</h2>
              <div className="navlist">
                <ul>
                  <li>
                    <Link href="/privacy-policy">
                    <a>Privacy policy</a>
                    </Link>
                    </li>
                  <li>
                    <Link href="/refunds-policy">
                    <a>Return &amp; Refund policy</a>
                    </Link>
                    </li>
                  <li>
                    <Link href="#">
                    <a>Shipping Policy</a>
                    </Link>
                    </li>
                  <li>
                    <Link href="/terms-conditions">
                    <a>Terms of Service</a>
                    </Link>
                    </li>
                </ul>
              </div>
            </div>                
          </div>
          <div className="col-md">
            <div className="footer-content-box">
              <h2 className="foot-title">FASHION</h2>
              <div className="navlist">
                <ul>
                  <li><a href="#">Smart Watches</a></li>
                  <li><a href="#">Men Accessories</a></li>
                  <li><a href="#">Sunglasses for women</a></li>
                </ul>
              </div>
            </div>                
          </div>
          <div className="col-md">
            <div className="footer-content-box">
              <h2 className="foot-title">SELF GROWING</h2>
              <div className="navlist">
                <ul>
                  <li><a href="#">Content Writing</a></li>
                  <li><a href="#">Emerging Technologies</a></li>
                  <li><a href="#">Social Media Marketing</a></li>
                  <li><a href="#">E-Commerce Management</a></li>
                </ul>
              </div>
            </div>                
          </div>
          <div className="col-md">
            <div className="footer-content-box">
              <h2 className="foot-title">BLOG</h2>
              <div className="navlist">
                <ul>
                  <li><a href="#">Online Store and a Busy Road</a></li>
                  <li><a href="#">Experience Of Best Online Shopping In Pakistan</a></li>
                  <li><a href="#">Best Imported Ladies Bags Available Online</a></li>
                </ul>
              </div>
            </div>                
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="text-center">
              <div className="store-apps text-uppercase">
                <h6>Shop on the Go</h6>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/img/google-playstore.png" className="me-3" />
                  <img src="/img/app-store.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <h6>FOLLOW US</h6>
              <div className="foot-social">
                <div className="d-flex justify-content-center align-items-center">
                  <a href="#" className="f-social-icon social-fb">
                    <img src="/img/fb-icon.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/tiktok-icon.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/pintrest-icon.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/instagram-icon-i.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/whatsapp-icon.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/snapchat-icon.png" />
                  </a>
                  <a href="#" className="f-social-icon">
                    <img src="/img/linkdin-icon.png" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copywright">
      <div className="container">
        <div className="row foot-bottom">
          <div className="col-md-12 text-center">
            <p>© BATA BOOTA 2022
            </p></div>
        </div>
      </div>     
    </div>
  </div>
</footer>
)
}
export default Footer;