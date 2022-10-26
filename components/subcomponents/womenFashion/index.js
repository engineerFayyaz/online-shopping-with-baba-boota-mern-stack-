import { useRouter } from "next/router";
import { setString } from "../../../utils/setSTRING";




const WomenFashion=({products})=>{
  const router = useRouter()

    return(
        <div className="cat-categories-wrap bg-grey">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="title text-uppercase mb-4 mb-sm-4 pt-2">
                women's fashion
                {/* <span>the warehouse sale</span> */}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {
                  products && products.map((data,i)=>{
                    return(
                      <div key={i} onClick={() => { router.push(`/product/${data.slug}`) }}  className="col-xs-2">
                      <div className="product-inner pr">
                        <div className="product-image pr oh lazyloadt4sed">
                          <a className="db" href="#">
                            <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloadt4sed">
                              <picture>
                                <img src={data.image && data.image[0].url} />
                              </picture>
                            </div>
                          </a>
                        </div>
                        <div className="product-info mt__15">
                          <div className="product-brand text-center text-uppercase">
                            <h4>up to {data.discount_amount}% off</h4>
                    <h3 data-toggle="tooltip" data-placement="top" title={data.name}>{setString(data.name?.trim())}</h3> 
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                  })
                }
        
          
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default WomenFashion;