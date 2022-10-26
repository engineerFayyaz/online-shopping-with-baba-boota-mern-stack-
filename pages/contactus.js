import { useState } from "react"
import axios from "axios"
import GlobalLayout from "../components/Layout/GlobalLayout"





const Contactus=()=>{
 let [formData,setformData]=useState({
   name:"",
   email:"",
   subject:"",
   mobile_number:"",
   message:"",
   complaint_type:""
 })

 const changeValue=(e)=>{
   setformData({...formData,[e.target.name]:e.target.value})
  }
const SubmitForm=async(e)=>{
   e.preventDefault()
   axios.post(`${process.env.NEXT_PUBLIC_API}/store/contactus`,formData)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });   console.log("Aa",formData)
}

    return(
      <GlobalLayout>
        <div className="container contactArea">
        <div className="row">
          <div className="col-sm-6">
            <div className="well">
              <h3 style={{lineHeight: '20%'}}><i className="fa fa-home fa-1x" style={{lineHeight: '6%', color: '#e2941e'}} /> Branches :</h3>
              <p style={{marginTop: '6%'}}>
              </p><p><strong>Montomery Road Branch:</strong>&nbsp;57/5-R, SehgalMotors.PK Outlet, Main Montgomery Road, Near Bank Al-Habib &amp; Soneri Bank, Lahore.&nbsp;<a href="http://smgp.pk/?i=1154"><strong>Google Map</strong></a><br />
                <br />
                <strong>Faisal Town Branch:</strong>&nbsp;SehgalMotors.PK Flagship Store, 25-C Main Faisal Town Road, Opposite Gourmet Restaurant, Lahore.&nbsp;<a href="http://smgp.pk/?i=5961"><strong>Google Map</strong></a><br />
                <br />
                <strong>Davis Road Branch:</strong>&nbsp;SehgalMotors.PK Building, 25/A Meer House, Opposite Tcs, Davis Road, Lahore.&nbsp;<a href="http://smgp.pk/?i=1155"><strong>Google Map</strong></a><br />
                <br />
                <strong>Johar Town Branch:</strong>&nbsp;SehgalMotors.PK Store, 862-R Main Boulevard near Shadewal Chowk, Johar Town, Lahore.&nbsp;<a href="http://smgp.pk/?i=9480"><strong>Google Map</strong></a><br />
                <br />
                <strong>DHA Branch:</strong>&nbsp;SehgalMotors.PK Store, Opposite Phase 5 exit, Adjacent to Nawaz Sharif Interchange Ring Road, DHA, Lahore.&nbsp;<a href="http://smgp.pk/?i=10722"><strong>Google Map</strong></a><br />
                <br />
                <strong>Studio Branch:</strong>&nbsp;SehgalMotors.PK Car Care &amp; Protection Studio, 8-C Main Faisal Town Road, Near Faysal Bank, Faisal Town, Lahore.&nbsp;<a href="http://smgp.pk/?i=19324"><strong>Google Map</strong></a></p>
              <p />
              <br />
              <br />
              <br />
              <br />
              <h3 style={{lineHeight: '20%'}}><i className="fa fa-users fa-1x" style={{lineHeight: '6%', color: '#e2941e'}} /> Get In Touch:</h3>
              <p style={{marginTop: '6%', lineHeight: '35%'}}>
              </p><ul className="socialList list-unstyled">
                <li>
                  <span className="sircle"><i className="fa-2x fa fa-whatsapp" /> <a href="tel:+923111222357 ">+923111222357</a></span>
                </li>
                <li>
                  <b>Working Hours:</b><span className="sircle"><i className="fa-2x fa fa-clock-o" /> <a href="#">10am-10pm</a></span>
                </li>
                <li>
                  <b>Working Days:</b><span className="sircle"><i className="fa-2x fa fa-calendar" /> <a href="#">Monday-Sunday (Except Public Holidays)</a></span>
                </li>
              </ul>
              <ul className="list-inline">
                <li>
                  <a href="https://www.facebook.com/sehgalmotorsoriginal/" target="_blank"><span className="sircle"><i className="fa-2x fa fa-facebook-square" /></span></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/sehgalmotors/" target="_blank"><span className="sircle"><i className="fa-2x fa fa-instagram" /></span></a>
                </li>
                <li>
                  <a href="https://twitter.com/sehgalmotors" target="_blank"><span className="sircle"><i className="fa-2x fa fa-twitter-square" /></span></a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCz3wNTYFIOZvHsPtvYYQzCw" target="_blank"><span className="sircle"><i className="fa-2x fa fa-youtube-play" /></span></a>
                </li>
                <li>
                  <a href="https://plus.google.com/+SehgalmotorsPk" target="_blank"><span className="sircle"><i className="fa-2x fa fa-google-plus-square" /></span></a>
                </li>
              </ul>
              <p />
            </div>
          </div>
          <div className="col-sm-offset-1 col-sm-5">
            <h3>Contact Us</h3>
            <p>
              We are here to answer any questions you may have about our products.<br />
              Reach out to us and we’ll respond as soon as we can.
            </p>
            <form onSubmit={SubmitForm}   >
              {/* <input  data-val-number="The field LoginID must be a number." id="ContactInquiry_LoginID" name="ContactInquiry.LoginID" type="hidden" defaultValue />                  */}
              <div className="form-group">
                <label>What you want to do? *</label>
                <select className="form-control" name="complaint_type" onChange={changeValue} value={formData.type}  required="required"><option value>-- Select --</option>
                  <option value="Inquiry">Inquiry</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Follow up">Follow up</option>
                  <option value="Business Relation">Business Relation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Name*</label>
                <input className="form-control"  name="name" onChange={changeValue} value={formData.fullName} required="required" type="text"  />
              </div>
              <div className="form-group">
                <label>Your email address *</label>
                <input className="form-control" name="email" onChange={changeValue} value={formData.email} required="required" type="email"  />
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input className="form-control"  name="subject" onChange={changeValue} value={formData.subject} required="required" type="text"  />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input className="form-control"  name="mobile_number" onChange={changeValue} value={formData.mobileNumber} pattern="[0-9]{11}" placeholder="0333xxxxxxx" required="required" type="number"  />
              </div>
              <div className="form-group">
                <label>Image (If Any) *</label>
                <input type="file" name="file"   />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea className="form-control" cols={20}  name="message" onChange={changeValue} value={formData.message} required="required" rows={5} defaultValue={""} />
              </div>
              <input type="submit" className="btn btn-warning"  style={{color: '#fff'}} name="submit" defaultValue="Send Message" /><img src="/images/h6viz.gif" style={{display: 'none'}} />
            </form>      
            </div>
        </div>
      </div>
      </GlobalLayout>
    )
}


export default Contactus