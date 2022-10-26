
import Link from "next/link"
import GlobalLayout from "../components/Layout/GlobalLayout"


const ReturnsPolicy=()=>{
    return(
        <>
        <GlobalLayout>
            <section className="mainCatSection innercatbg" style={{backgroundPosition: 'center left', backgroundColor: '#b83108'}}>
          <div className="main-overlay" style={{backgroundColor: '#b83108', opacity: '0.5'}} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2>Returns Policy<small>Sehgalmotors</small></h2>
              </div>
            </div>
          </div>
        </section>
        <div className="container returnPage" style={{padding: '50px 0px'}}>
        <div className="margin-top-20 margin-btm-30">
        <ul className="nav nav-pills nav-justified">
              <li ><Link href="/how-to-return/"><a>How to Return a Product</a></Link></li>
              <li className="active" style={{padding: '0 10px'}}><Link href="/returns-policy"><a>Returns Policy</a></Link></li>
              <li  ><Link href="/refunds-policy/"><a>Refunds Policy</a></Link></li>
            </ul>
        </div>
        <div className>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-10">
                <h3 style={{marginTop: 0}}>Returns Policy</h3>
                <ol className="custom-counter">
                  <li>If your product is defective / damaged or the order is Incorrect/Incomplete at the time of delivery, please contact us within the applicable time period of return. Your product may be eligible for refund or replacement depending on the product category and condition. Please see the detailed terms in the relevant category below</li>
                  <li>Please note that not all products are eligible for a return, if the product is "No longer needed"</li>
                  <li>For device related issues after usage or the expiration of the return window, we will refer you to the brand warranty center (if applicable). For more information on warranty claims please view our<a href="/terms-conditions"> Warranty Policy</a></li>
                </ol>
                <p>You will always find the relevant terms on the product page (Return Policy tab).</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10">
                <h3>Valid reasons to return an item</h3>
                <ol className="custom-counter">
                  <li>Delivered Product is damaged (physically destroyed or broken) / defective (dead on arrival)</li>
                  <li>Delivered Product is Incorrect (different than the one presented on our website) / Incomplete (missing parts)</li>
                  <li>
                    Delivered Product is “No longer needed”* (implies that you no longer have a use for the product / you have changed your mind about the purchase / the size of a fashion product does not fit / you do not like the product after opening the package) *Eligible for selected products only
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{paddingLeft: 0}}>
            <div className="boxed">
              <h3 style={{textAlign: 'center'}}>Conditions for Returns</h3>
              <ol className="olclass" style={{marginTop: '-4px'}}>
                <li>The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see  if they fit and will still be considered unworn</li>
                <li>The product must include the original tags, user manual, warranty cards, freebies and accessories</li>
                <li>The product must be returned in the original and undamaged manufacturer packaging / box. If the product was delivered in a second layer of SehgalMotors.Pkpackaging, it must be returned in the same condition with return shipping label attached. Do not put tape or stickers on the manufacturers box</li>
              </ol>
            </div>
            <div className="notice">
              <p>If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.</p>
            </div>
          </div>
        </div>
      </div>
      </GlobalLayout>
      </>
    )
}

export default ReturnsPolicy