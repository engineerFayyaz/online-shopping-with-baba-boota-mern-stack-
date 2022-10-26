import dynamic from "next/dynamic";
import { getSession, signIn } from "next-auth/react";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
// import Error500 from "~/components/error/500";
import { useRouter } from 'next/router'
import axios from "axios"
  ;
import { wrapper } from "../redux/store";
import GlobalLayout from "../components/Layout/GlobalLayout";
import Login from "../components/subcomponents/login";

export default function SignUpPage({ srvError }) {
  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [address, setAddress] = useState("")
  let [phone, setPhone] = useState("")
  let [country, setCountry] = useState("pakistan")
  let [city, setCity] = useState("")
  let [Cpassword, setCpassword] = useState("")
  let [cityData, setCityData] = useState([])

  const router = useRouter()

  // const name = useRef();
  // const email = useRef();
  // const password = useRef();
  // const passwordConfirm = useRef();
  useEffect(() => {
    $(document).mouseup(function (e) {
      var container = $(".sidebarlogin");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('show-sidebar')) {
          $('body').removeClass('show-sidebar');
          $('body').find('.js-menu-toggle').removeClass('active');
        }
      }
    });
  }, [])
  const ClickSignin = () => {
    if ($('body').hasClass('show-sidebar')) {
      $('body').removeClass('show-sidebar');
    } else {
      $('body').addClass('show-sidebar');
    }

  }



  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (password == Cpassword) {
        let data = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
          phone: phone,
          country: country,
          region: city,
          address: address,
        }
        const response = await axios.post(`http://localhost:4200/api/signup`, data);
        console.log(response);
        response.data.success
          ?
          SuccessSignup(response.data.user)
          // router.push("/signin")

          : !response.data.success && response.data.duplicate
            ? toast.error("User with the given email is already exists")
            : toast.error("Something went Wrong");
      } else {
        toast.error("Both Password Field Value Not Matched");
        passwordConfirm.current.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const SuccessSignup = async (data) => {
    let a = {
      email: data.email, password: password
    }
    let res = await signIn("CredentialsProvider", { redirect: false, ...a })
    res.url = null
    if (!res.error) {
      toast.success("Signup Successfully ")
      router.push("/")
    }
  }
  useEffect(() => {
    let getCities = async () => {
      let { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/get/cities`)
      setCityData(data)
    }
    getCities()

  }, [])


  return (
    <>
      {srvError ? (
        <Error500 />
      ) : (
          <>
            <GlobalLayout>
              <section class="login">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                      <div class="row">
                        <h4 class="f_text">Get Registered</h4>
                        <div class="contact-fields login_area">
                          <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                            <form onSubmit={handleForm} method="post">
                              <div class="row">
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input id="Login_FirstName" name="first_name" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} required="required" type="text" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">First Name <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input id="Login_LastName" name="lastname" onChange={(e) => { setLastName(e.target.value) }} value={lastName} required="required" type="text" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Last Name <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input id="Login_Email" name="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required="required" type="text" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Email <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input id="Login_Phone" name="phone" onChange={(e) => { setPhone(e.target.value) }} value={phone} required="required" type="text" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Phone Number <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input id="txtPassword" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required="required" type="password" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Password <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <input value={Cpassword} onChange={(e) => { setCpassword(e.target.value) }} type="password" required="required" />
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Re-Type Password <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <select defaultValue="pakistan" >
                                        <option value="paskitan">Pakistan</option>

                                      </select>
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <select onChange={(e) => { setCity(e.target.value) }} ><option value="">-- Select City --</option>
                                        {
                                          cityData?.map((data, i) => {
                                            return (
                                              <option key={i} value={data.name}>{data.name}</option>
                                            )
                                          })
                                        }
                                      </select>
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-12 col-lg-12">
                                  <div class="contactField  wow bounceInLeft animated" style={{ visible: "animation-name", visible: "bounceInLeft" }}>
                                    <div class="group">
                                      <textarea cols="20" id="Login_Address1" name="address" onChange={(e) => { setAddress(e.target.value) }} value={address} required="required" rows="2"></textarea>
                                      <span class="highlight"></span>
                                      <span class="bar"></span>
                                      <label class="contactLabel">Address <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>



                              </div>
                              <input type="submit" name="name" value="Registered Now" class="btn btn-warning btn-block btn_login" />
                            </form>
                            <br />
                            <a class="d_acco">Already have an accont?</a>
                            <a onClick={ClickSignin} href="javascript:void(0)" class="g_reg">Login</a>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Login ClickSignin={ClickSignin} />
            </GlobalLayout>
            <ToastContainer />
          </>
        )}
    </>
  );
}

SignUpPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {

      const { req, res } = context;
      const session = await getSession({ req });
      if (session && res && session.user) {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
        return;
      }
      return {
        session: undefined,
      };
    } catch (err) {
      console.log(err);
      return {
        srvError: true,
      };
    }
  },
);

SignUpPage.footer = false;
