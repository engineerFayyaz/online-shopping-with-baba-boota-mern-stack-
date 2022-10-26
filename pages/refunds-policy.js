
import Link from "next/link"
import GlobalLayout from "../components/Layout/GlobalLayout"


const RefundsPolicy=()=>{
    return(
    <>
    <GlobalLayout>
    <section className="mainCatSection innercatbg" style={{backgroundPosition: 'center left', backgroundColor: '#b83108'}}>
          <div className="main-overlay" style={{backgroundColor: '#b83108', opacity: '0.5'}} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2>Refunds Policy<small>Sehgalmotors</small></h2>
              </div>
            </div>
          </div>
        </section>
          <div className="container returnPage" style={{padding: '50px 0px'}}>
        <div className="margin-top-20 margin-btm-30">
        <ul className="nav nav-pills nav-justified">
              <li ><Link href="/how-to-return/"><a>How to Return a Product</a></Link></li>
              <li  style={{padding: '0 10px'}}><Link href="/returns-policy"><a>Returns Policy</a></Link></li>
              <li className="active" ><Link href="/refunds-policy/"><a>Refunds Policy</a></Link></li>
            </ul>
        </div>
        <div className>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-10">
                <h3>Issuance of Refunds</h3>
                <p>If your product is eligible for a refund, you can choose your preferred refund method based on the table below. The shipping fee is not refunded along with the amount paid for your returned product.</p>
                <p>The time required to complete a refund depends on the refund method you have selected. The expected processing time mentioned below is after we have received your product (2-3 working days) and it has undergone a quality control (1-2 working days).</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10 margin-top-20">
                <table className="refund-table table table-bordered">
                  <thead>
                    <tr>
                      <th style={{textAlign: 'left'}}>Payment Method</th>
                      <th style={{textAlign: 'left'}}>Refund Option</th>
                      <th style={{textAlign: 'left', width: '34%'}}>Refund Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={2}>1 Link Bank Transfer</td>
                      <td rowSpan={1}>Bank Deposit</td>
                      <td>15 working days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10 margin-btm-30 margin-top-10">
                <h3>Modes of Refund</h3>
                <div className="accordion-content panel-group" id="accordion">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>Bank Deposit</h4>
                    </div>
                    <div className="panel-collapse">
                      <div className="panel-body">
                        <div className="fbck" style={{display: 'block'}}>
                          <div className="question">
                            <p>The bank account details provided must be correct and the account must be active and should hold some balance. Do not provide account details of Basic Bank Account (BBA), National Bank and Khyber bank as refunds for these modes cannot be processed.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </GlobalLayout>
    </>
    )
}

export default RefundsPolicy