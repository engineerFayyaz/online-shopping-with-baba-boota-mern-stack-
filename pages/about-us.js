import GlobalLayout  from "../components/Layout/GlobalLayout"




const Aboutus=()=>{
    return(
        <>
        <GlobalLayout>
        <section className="mainCatSection innercatbg" style={{backgroundPosition: 'center left', backgroundColor: '#b83108'}}>
        <div className="main-overlay" style={{backgroundColor: '#b83108', opacity: '0.5'}} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>About<small></small></h2>
            </div>
          </div>
        </div>
      </section>
      <div className="container" style={{padding: '50px 0px'}}>
        <div className="col-xs-12 col-md-10 col-md-offset-1">
          <section className="card card-lg" id="about-about">
            <h1 className="text-center">- Our Mission -</h1>
            <h3 style={{fontWeight: 300,fontFamily:"inherit",color: '#848484'}} className="text-center">Customer Satisfaction | Meeting Your Demands |
              Redefining Modification.</h3>
            <h2 className="text-center">About Us</h2>
            <div className="text-xs text-justify m-x-auto">
              <h4 style={{fontWeight: 300, lineHeight: '25px',fontFamily:"inherit",color: '#848484'}}><strong style={{color:"black"}}>Sehgal Motors</strong>&nbsp; is the leading &amp;
                largest online retail in Pakistan, offering e-commerce marketplace for Car Accessories,
                Modification, Decoration Parts, Gadgets, Body Conversions &amp; Mobile Accessories. Headquartered in
                Lahore, the online shopping platform has a portfolio of over 100 local and international brands
                and has established itself as a notable success story. The company aims to provide e-commerce
                services at lowest possible price with the minimum commission charged from its vendor. To
                support the development of a vibrant online culture, Pakistan’s leading ecommerce portal
                SehgalMotors.pk, which hosts over 100,000 visitors on its website daily, offers a portfolio of
                over 25,000 products, cash on delivery, nationwide shipping and a 7-day return policy. To
                enhance user experience, SehgalMotors.PK has launched an online shopping app for Android and iOS
                phones. This is designed to provide a user-friendly and easily accessible platform for customers
                on-the-go and simplify shopping by bringing online shopping to the fingertips of SehgalMotors.PK
                users.
                SehgalMotors.PK welcomes all new vendors, brands and products on its portal to provide its
                customer all under one roof experience at a commission of 1-2%. To enrich user experience,
                several brands and products are readily available by SehgalMotors.PK by its vendor on sale-base
                mechanism. Hence, however, SehgalMotors.PK do not take any responsibility for examining or
                evaluating, or assume any responsibility or liability for the actions, products, and content of
                any of these and other third-parties. If you want to sell products at SehgalMotors.PK portal,
                feel free to write us at info@sehgalmotors.pk with a clear subject “business relation” so the
                email is routed to a right department.
              </h4>
              <br />
              <div className="text-center">
                <a style={{color: '#fff'}} className="btn btn-l btn-warning" href="https://www.facebook.com/sehgalmotors1" target="_blank">Join Our Team</a>
              </div>
              <br />
            </div>
          </section>
        </div>
      </div>
      </GlobalLayout>
      </>
    )
}

export default Aboutus;