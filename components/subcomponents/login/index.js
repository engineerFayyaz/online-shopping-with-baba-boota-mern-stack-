import { useState } from "react"
import { signIn, getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"



const Login = ({ ClickSignin }) => {
    const router = useRouter()

    let [cmp, setCmp] = useState(1)
    let [sendotp, setSendotp] = useState(false)

    let [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: ""
    })
    let [otp, setOtp] = useState("")

    const submitForm = async (e) => {
        e.preventDefault()
        let data = null
        if (cmp == 1) {
            data = {
                email: formData.email,
                password: formData.password,
                otp:""
            }


        } else if (cmp == 2) {
            data = {
                phone: formData.phone,
                code: otp
            }
        }
        try {
            let res = await signIn("CredentialsProvider", { redirect: false, ...data })
            res.url = null
            if (!res.error) {
                ClickSignin()
                toast.success("Login Successfully")
                // if(!localStorage.getItem("CART")){

                //     router.push("/")
                //     return
                // }
                router.push("/")
                setSendotp(false)
                  

            } else {
                toast.error(res.error)
                setSendotp(false)

            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const sendOtpData=async(e)=>{
        e.preventDefault()
        try {
            const formData1 = {
                phone: formData.phone
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/mobilelogin`, formData1);
            console.log(response);
            if(response.data.status === 200) {
                setSendotp(true)
                toast.success("otp send sucessfully")
            }
            if(response.data.status === 404) {
                toast.error(response.data.message)
            }
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <>
            <aside className="sidebarlogin">

                {
                    cmp == 1 ?
                        <>
                            <div className="side-inner">
                                <div className="share">
                                    <div className="d-flex justify-content-between align-items-center sidebarhead">
                                        <h2>LOGIN</h2>
                                        <span><a href="#" className="js-menu-toggle menu-toggle" onClick={ClickSignin} ><img src="/img/cross-icon.png" /></a></span>
                                    </div>
                                    <div className="btn-group btn-group-toggle space" data-toggle="buttons">
                                
                                        <label onClick={() => { setCmp(2) }} className={`${cmp==2? "btn btn-secondary active focus " :"btn btn-secondary space" }`}>
                                            <input type="radio"  name="options" id="option2"  autoComplete="off" /> Login With Phone
                                             </label>
                                        <label onClick={() => { setCmp(1) }} className={`${cmp==1? "btn btn-secondary active focus" :"btn btn-secondary" }`}>
                                            <input type="radio"  name="options" id="option3"  autoComplete="off" /> Login With Email
                                               </label>
                                    </div>
                                    <form onSubmit={submitForm}>
                                        <input type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} className="form-control " placeholder="Email" />
                                        <input type="password" value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} className="form-control " placeholder="password" />
                                        <p><a href="#" className="forgot-password">Forgot your password?</a></p>
                                        <input type="submit" className="btn btn-primary btn-block btn-login-submit" defaultValue="Checkout" />
                                        <div className="nc-recover">
                                            <p><a onClick={() => { ClickSignin(); router.push("/register") }} href="javascript:void(0)" className="forgot-password">New customer? Create your account</a></p>
                                        </div>
                                    </form>
                                </div>
                                <div className="social_sec">
                            <div className="social_txt">
                                <span>OR</span>
                            </div>
                            <button  onClick={() => { signIn("facebook") }} className="loginBtn loginBtn--facebook">
                            Login with Facebook
                         </button>

                        <button style={{padding: "0 35px 0 46px"}}  onClick={() => { signIn("google") }} className="loginBtn loginBtn--google">
                            Login with Google
                          </button>
                           
                        </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="side-inner">
                                <div className="share">
                                    <div className="d-flex justify-content-between align-items-center sidebarhead">
                                        <h2>LOGIN</h2>
                                        <span><a href="#" className="js-menu-toggle menu-toggle" onClick={ClickSignin} ><img src="img/cross-icon.png" /></a></span>
                                    </div>
                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                
                                <label onClick={() => { setCmp(2) }} className={`${cmp==2? "btn btn-secondary active focus" :"btn btn-secondary space" }`}>
                                    <input type="radio"  name="options" id="option2" autoComplete="off" /> Login With Phone
                                     </label>
                                <label onClick={() => { setCmp(1) }} className={`${cmp==1? "btn btn-secondary active focus" :"btn btn-secondary" }`}>
                                    <input type="radio"  name="options" id="option3" autoComplete="off" /> Login With Email
                                       </label>
                            </div>
                                    <form >
                                        <input type="tel" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} className="form-control" placeholder="Mobile Number" style={{marginTop:"20px"}}/>
                                        {
                                            sendotp ?
                                                <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value) }} className="form-control " placeholder="OTP" />
                                                :
                                                ""
                                        }
                                        <p><a href="#" className="forgot-password">Forgot your password?</a></p>
                                        {
                                            sendotp ?
                                                <input onClick={submitForm} className="btn btn-primary btn-block btn-login-submit" defaultValue="Checkout" />
                                                :
                                                <button onClick={sendOtpData}   className="btn btn-primary btn-block btn-login-submit" >Send Otp</button>
                                        }
                                        <div className="nc-recover">
                                            <p><a onClick={() => { router.push("/register") }} href="javascript:void(0)" className="forgot-password">New customer? Create your account</a></p>
                                        </div>
                                    </form>
                                </div>
                                <div className="social_sec">
                            <div className="social_txt">
                                <span>OR</span>
                            </div>
                            <button  onClick={() => { signIn("facebook") }} className="loginBtn loginBtn--facebook">
                            Login with Facebook
                         </button>

                        <button style={{padding: "0 35px 0 46px"}}  onClick={() => { signIn("google") }} className="loginBtn loginBtn--google">
                            Login with Google
                          </button>
                           
                        </div>
                            </div>
                    
                        </>
                }

            </aside>
            <ToastContainer position="top-center" />

        </>
    )
}

export default Login