


const Banner = ({banner}) =>{
    return(
        <div className="">
        <div className="h-sale-banner single-banner">
          <div className="row">
            <div className="col-md-12">
              <div className="h-sale-banner-wrap">
                <img src={`${banner?.Images[0]?.url}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Banner