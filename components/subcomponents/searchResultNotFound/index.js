


const SearchResultNotFound=({searchName})=>{

    return(
        <>
       <div className="col-sm-8 col-md-10">
                <div className="search-result">
    <h4>Search result for {searchName}</h4>
                  <hr />
                  <p>Sorry, we don't have this item...But we will get it for you! Here is HOW...</p>
                  <div className="item-request media">
                    <div className="media-left">
                      <img src="/images/noresultsearch_bg1.png" />
                    </div>
                    <div className="media-body">
                      <p>Just give us your number:</p>
                      <label className="label_field">Number: *</label>
                      <input type="number" id="Phoneno" placeholder="0333xxxxxxx" pattern="[0-9]{11}" /> &nbsp;  <b><a id="btnsnd" onclick="Sendinquiry()" style={{color: '#e26c1e', cursor: 'pointer'}}>Submit</a></b> &nbsp; <span className="glyphicon glyphicon-ok" id="tickk" style={{display: 'none', color: 'green'}} />
                      <input type="hidden" defaultValue="toyotaaaa" id="srchitem" />
                    </div>
                  </div>
                  <div className="item-request media">
                    <div className="media-left">
                      <img src="/images/noresultsearch_bg2.png" />
                    </div>
                    <div className="media-body">
                      <p>Our sales representative will contact you.</p>
                    </div>
                  </div>
                  <div className="item-request media">
                    <div className="media-left">
                      <img src="/images/noresultsearch_bg3.png" />
                    </div>
                    <div className="media-body">
                      <p>With over 50 years automotive experience &amp; over millions of products, we will find the right item for you.</p>
                    </div>
                  </div>
                  <div className="item-request media">
                    <div className="media-left">
                      <img src="/images/noresultsearch_bg4.png" />
                    </div>
                    <div className="media-body">
                      <p>You will get exactly what you were looking for delivered to your doorstep.</p>
                    </div>
                  </div>
                </div>
              </div>
      <style jsx>{`
       .search-result h4 {
        margin: 0px;
        font-size: 30px;
        color: #0a263c;
        font-weight: bold;
    }
    .search-result p {
        padding: 0 !important;
        font-size: 20px;
        color: #3d6611;
    }
    .item-request{
        margin-top: 20px;
    }
    .item-request .media-left img {
        width: 80px;
    }
    .item-request .media-body p {
        font-size: 18px;
        width: 600px;
        margin: 5px;
    }
    .item-request .media-body label {
        font-size: 18px;
        margin-top: 5px;
    }
      `}</style>
      </>
    )
}

export default SearchResultNotFound