import GlobalLayout from "../components/Layout/GlobalLayout"





const TrackShipment = () => {
    return (
        <>
        <GlobalLayout>

            <section className="mainCatSection innercatbg" style={{ backgroundPosition: 'center left', backgroundColor: '#b83108' }}>
                <div className="main-overlay" style={{ backgroundColor: '#b83108', opacity: '0.5' }} />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>Track Shipment</h1>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="col-sm-12 col-md-4 col-md-offset-4">
                    <div className="input-group" style={{ marginTop: '15px' }}>
                        <input type="text" id="OrdID" className="form-control input-lg input" placeholder="Enter Order Id" autoComplete="off" />
                        <span className="input-group-btn">
                            <button className="btn btn-search btn-lg btn-warning" onclick="TrackConsine()" type="button" style={{ color: '#fff' }}>Track</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container" style={{ display: 'none' }} id="msgdiv">
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-md-offset-1">
                        <p style={{ fontSize: '40px' }} className>Your Consignment Number is <span id="cnNumber" /> Click on this link to track your order   <a href="http://leopards.com.pk/tracking/index.php?cn_number=780987619" id="trackidd" target="_blank">Track</a></p>
                    </div>
                </div>
            </div>
            <div className="container" style={{ display: 'none' }} id="msgdivleopard">
                <form className="example" action="http://leopards.com.pk/tracking1/index.php" method="POST" id="myform">
                    <input style={{ display: 'none' }} type="text" name="cn_number" id="cn_number" placeholder="Track shipments" />
                    <div className="row">
                        <div className="col-xs-12 col-md-12 col-md-offset-1">
                            <p style={{ fontSize: '40px' }} className>Your Consignment Number is <span id="leocnNumber" /> Click on this link to track your order  <a href="#" onclick="document.getElementById('myform').submit()">Track</a></p>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container" style={{ padding: '20px 0px' }}>
                <div className="col-xs-12 col-md-10 col-md-offset-1">
                    <section className="card card-lg" id="about-about">
                        <p dir="ltr">&nbsp;</p>
                        <p dir="ltr"><strong>Track Your SehgalMotors.pk Order Online</strong></p>
                        <p dir="ltr">Waiting for your order delivery? Now, you can easily track your orders online via SehgalMotors.PK order tracker! Just Copy and Paste your parcel's Order ID received via text message in the search box and start tracking your package. You can also easily find your parcel tracking code in your order details page.</p>
                        <p dir="ltr">&nbsp;</p>
                        <p dir="ltr"><strong>SMS Alert Order Notifications</strong></p>
                        <p dir="ltr">We notify you via SMS on your registered number when your order is placed, packed, dispatched, and when the rider is about to reach you to improve our customer experience.</p>
                    </section>
                </div>
            </div>
           </GlobalLayout>
        </>
    )
}

export default TrackShipment;