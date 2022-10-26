import Link from  "next/link"
import GlobalLayout from "../components/Layout/GlobalLayout"


const HowToReturn=()=>{
    return(
<>
<GlobalLayout>
<section className="mainCatSection innercatbg" style={{backgroundPosition: 'center left', backgroundColor: '#b83108'}}>
          <div className="main-overlay" style={{backgroundColor: '#b83108', opacity: '0.5'}} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2>Place an Order<small>Sehgalmotors</small></h2>
              </div>
            </div>
          </div>
        </section>
        <div className="container returnPage" style={{padding: '50px 0px'}}>
          <div className=" margin-top-20 margin-btm-30">
            <ul className="nav nav-pills nav-justified">
              <li className="active"><Link href="/how-to-return/"><a>How to Return a Product</a></Link></li>
              <li style={{padding: '0 10px'}}><Link href="/returns-policy/"><a>Returns Policy</a></Link></li>
              <li><Link href="/refunds-policy/"><a>Refunds Policy</a></Link></li>
            </ul>
          </div>
          <div className=" ">
            <div className="col-sm-8">
              <ul className="custom-counter return-product-step margin-btm-30">
                <li>
                  <div className="row">
                    <div className="col-sm-10" style={{marginTop: '-20px'}}>
                      <p>Call <strong>03111222357</strong> to create your <strong>return request</strong></p>
                    </div>
                    <div className="col-sm-2" style={{marginTop: '-45px'}}>
                      <img src="images/73eebeabdcdf4542f7a7d900a80fcf43.jpg" alt="" style={{}} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-sm-10" style={{marginTop: '-20px'}}>
                      <p className="liwidth">Repack your SehgalMotors.PK parcel securely with the product in the<strong> original undamaged manufacturer's packaging</strong> you received, on the time of delivery</p>
                    </div>
                    <div className="col-sm-2" style={{marginTop: '-45px'}}>
                      <img src="images/466c6658c502b7419e3db9c935edf935.jpg" alt="" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-sm-10" style={{marginTop: '-20px'}}>
                      <p className="liwidth">Attach the <strong>return label</strong>, that you received with your order, to the top of the parcel (ensure that the delivery label is covered/secured)</p>
                    </div>
                    <div className="col-sm-2" style={{marginTop: '-45px'}}>
                      <img src="images/54e3e583eacb556eb0b40865eb4e2032.jpg" alt="" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-sm-10" style={{marginTop: '-20px'}}>
                      <p className="liwidth">Send To Our Sehgal Motors Head Office Branch <br /> <strong>Address: </strong>SehgalMotors.PK, 25/A Meer House, Opposite TCS, Davis Road, Lahore, Pakistan</p>
                    </div>
                    <div className="col-sm-2" style={{marginTop: '-45px'}}>
                      <img src="images/291acb62d7b09ea08fcf57dccbdddfa5.jpg" alt="" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <div className="boxed">
                <h3 style={{textAlign: 'center'}}>Conditions for Returns</h3>
                <ol className="olclass" style={{marginTop: '-4px'}}>
                  <li>
                    The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
                  </li>
                  <li>The product must include the original tags, user manual, warranty cards, freebies and accessories.</li>
                  <li>The product must be returned in the original and undamaged manufacturer packaging / box. If the product was delivered in a second layer of SehgalMotors.pk packaging, it must be returned in the same condition with return shipping label attached. Do not put tape or stickers on the manufacturers box.</li>
                </ol>
              </div>
              {/*Popular Links*/}
              <div className="popular margin-top-30">
                <h3>Popular Links</h3>
                <p>
                  <a href="/returns-refunds-faq/"> Frequently Asked Questions</a><br />
                  <a href="/warranty-policy/"> Warranty Policy</a><br />
                  <a href="/brand-contact-details/"> Brand Contact List</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        </GlobalLayout>
</>
    )
}

export default HowToReturn