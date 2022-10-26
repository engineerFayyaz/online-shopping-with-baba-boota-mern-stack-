import GlobalLayout from "../components/Layout/GlobalLayout"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"




const EditProfile = () => {
  let router = useRouter()
  let [popup, setPopUp] = useState("")
  let [profileData, setProfileData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  })

  let [password, setpassword] = useState({
    password: "",
    cPassword: "",
  })
  let [user, setUser] = useState({})
  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const session = await getSession()
    if (session) {
      let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/get/profile?id=${session.user.id}`)
      setUser(data.user)
      setProfileData({
        email: data.user.email,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        phone: data.user.phone,
        address: data.user.address,
      })
    } else {
      router.push("/")
    }
  }

  const updateProfile=async()=>{
    
    let data=await axios.post(`${process.env.NEXT_PUBLIC_API}/store/update/profile?scope=info`,{...profileData,id:user._id})
    getProfile()
    setPopUp("")
  }
  const updatePassword=async()=>{
    if(password.password!==password.cPassword){
      toast.error("Password does not match")
    }else if(!password.password || !password.cPassword){
      toast.error("All fields required")
    }
    else{
      let data=await axios.post(`${process.env.NEXT_PUBLIC_API}/store/update/profile?scope=password`,{password:password.password,id:user._id})
        setPopUp("")
    }
  }
  return (
    <>
      <GlobalLayout>
        <div className="edit_prof-sec">
          <section className="flex arange_cont prof_style prof_sec">
            <div className="pos_rel prof_img">
              <div className="img">
                <img id="myUploadedImg" className="openfile" alt="Photo" src="images/Dummyprofileimage.jpg" />
              </div>
              <div className="flex arange_cont change_prof">
                <img src="images/cameraIcon.png" alt="" />
              </div>
              <div style={{ display: 'none' }}>
                <input type="file" className="upload" id="btnUpload" accept="image/*" />
              </div>
            </div>
            <div className="prof_name">
              <span className="FirstName">{user?.firstname}{" "}{user?.lastname}</span>
              <div role="button" className="edit_prof-btn" onClick={() => { setPopUp("editprofile") }}>
                <span>Edit Profile</span>
                <img src="images/editIcon.png" alt="" />
              </div>
            </div>
          </section>
          <section className="prof_style profile_info">
            <div className="flex arange_cont prof_sec info_sec">
              <p>User Name</p>
              <span className="FirstName">{user?.firstname}{" "}{user?.lastname}</span>
            </div>
            {/* <div className="flex arange_cont prof_sec info_sec">
            <p>Gender</p>
            <span id="gender">------</span>
          </div> */}
            <div className="flex arange_cont prof_sec info_sec">
              <p>Contact Number</p>
              <span>{user?.phone}</span>
            </div>
          </section>
          <section className="flex arange_cont prof_style change_password" onclick="popup('emailPopup')">
            <div className="flex arange_cont prof_sec info_sec">
              <p>Your Email</p>
              <span id="AddyourEmail">{user?.email} </span>
            </div>
            <img src="images/arrowIcon.png" alt="" />
          </section>
          <section className="flex arange_cont prof_style change_password" onclick="popup('emailPopup')">
            <div className="flex arange_cont prof_sec info_sec">
              <p>Address</p>
              <span id="AddyourEmail">{user?.address} </span>
            </div>
            <img src="images/arrowIcon.png" alt="" />
          </section>
          <section className="flex arange_cont prof_style change_password" onClick={() => { setPopUp("editpassword") }}>
            <div className="flex arange_cont prof_sec info_sec">
              <p>Set Password</p>
              <span>******</span>
            </div>
            <img src="images/arrowIcon.png" alt="" />
          </section>
        
          <div className={popup == "editpassword" ? "popup active" : "popup"} id="editProfPopup">
            <div className="popup_dialog dialog_bottom dialog_address">
              <div className="flex arange_cont popup_header-2 address_header">
                <p>Edit Password</p>
                <span onclick="popup('editProfPopup')"> <img src="images/cancel-icon-white.png" alt="" /> </span>
              </div>
              <div className="popup_content add_address-sec">
                <div className="pos_rel">
                  <div className="pos_rel_group">
                    <label> Password</label>
                    <input className="form-control" value={password.password} onChange={(e)=>{setpassword({...password,password:e.target.value})}} id="ContactName" type="email" name="FirstName" required />
                  </div>
                  <div className="pos_rel_group">
                    <label>Confirm Password</label>
                    <input className="form-control" value={password.cPassword} onChange={(e)=>{setpassword({...password,cPassword:e.target.value})}} id="ContactName" type="email" name="FirstName" required />
                  </div>

                </div>

                <button onClick={updatePassword} className="btn btn-block review_btn share_review-btn">Update Password</button>
                <button onClick={() => { setPopUp("") }} className="btn btn-block review_btn share_review-btn">Cancel</button>

              </div>
            </div>
          </div>
          {/* Edit Profile Popup */}
          <div className={popup == "editprofile" ? "popup active" : "popup"} id="editProfPopup">
            <div className="popup_dialog dialog_bottom dialog_address">
              <div className="flex arange_cont popup_header-2 address_header">
                <p>Edit Profile</p>
                <span onclick="popup('editProfPopup')"> <img src="images/cancel-icon-white.png" alt="" /> </span>
              </div>
              <div className="popup_content add_address-sec">
                <div className="pos_rel">
                  <div className="pos_rel_group">
                    <label>First Name</label>
                    <input className="form-control" value={profileData.firstname} onChange={(e)=>{setProfileData({...profileData,firstname:e.target.value})}} type="text"  required />
                  </div>
                  <div className="pos_rel_group">
                    <label>Last Name</label>
                    <input className="form-control" value={profileData.lastname} onChange={(e)=>{setProfileData({...profileData,lastname:e.target.value})}} type="text"  required />
                  </div>
                  <div className="pos_rel_group">
                    <label>Email</label>
                    <input className="form-control" value={profileData.email} onChange={(e)=>{setProfileData({...profileData,email:e.target.value})}} type="email"  required />
                  </div>
                  <div className="pos_rel_group">
                    <label> Contact Number</label>
                    <input className="form-control" value={profileData.phone} onChange={(e)=>{setProfileData({...profileData,phone:e.target.value})}} type="tel" required />
                  </div>
                  <div className="pos_rel_group">
                    <label>Address</label>
                    <input className="form-control" value={profileData.address} onChange={(e)=>{setProfileData({...profileData,address:e.target.value})}} type="text"  required />
                  </div>
                </div>

                <button onClick={updateProfile} className="btn btn-block review_btn share_review-btn">Update Profile</button>
                <button onClick={() => { setPopUp("") }} className="btn btn-block review_btn share_review-btn">Cancel</button>

              </div>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </>
  )
}

export default EditProfile