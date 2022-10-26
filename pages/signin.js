// import dynamic from "next/dynamic";
// import { getCsrfToken, getSession, signIn } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useSelector } from "react-redux";

// import { appUrl, fetchData, setSettingsData } from "../lib/clientFunctions";
// import { wrapper } from "../redux/store";
// import GlobalLayout from "../components/Layout/GlobalLayout";
// export default function SignIn({ authCsrfToken, srvError }) {
//   const { error } = useRouter().query;
//   const settings = useSelector((state) => state.settings);
//   const errors = {
//     Signin: "Try signing with a different account.",
//     OAuthSignin: "Try signing with a different account.",
//     OAuthCallback: "Try signing with a different account.",
//     OAuthCreateAccount: "Try signing with a different account.",
//     EmailCreateAccount: "Try signing with a different account.",
//     Callback: "Try signing with a different account.",
//     OAuthAccountNotLinked:
//       "To confirm your identity, sign in with the same account you used originally.",
//     EmailSignin: "Check your email address.",
//     CredentialsSignin:
//       "Sign in failed. Check the details you provided are correct.",
//     default: "Unable to sign in.",
//   };
//   const SignInError = ({ error }) => {
//     const errorMessage = error && (errors[error] ?? errors.default);
//     return <div className="alert alert-danger">{errorMessage}</div>;
//   };

//   return (
//     <>
//       {srvError ? (
//         <Error500 />
//       ) : (
//         <>
//         <GlobalLayout>
//        <section className="login">
//         <div className="container">
//           <div className="row">
//             <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
//               <div className="row">
//                 <h4 className="f_text">For Existing User</h4>
//                 <div className="login_area contact-fields">
//                   <div className="col-xs-12 col-sm-offset-1 col-sm-10  col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
//                     <form action="/api/mobileauth/callback/credentials" method="post">
//                       <div className="contactField  wow bounceInLeft animated" style={{visibility: "visible",animationName:"bounceInLeft"}}>
//                         <div className="group">
//                           <input id="Email" name="Email" required="required" type="email"/>
//                           <span className="highlight"></span>
//                           <span className="bar"></span>
//                           <label className="contactLabel">Email Address <span>*</span>
//                           </label>
//                         </div>
//                       </div>
                      
//                       <div className="contactField  wow bounceInLeft animated" style={{visibility: "visible",animationName:"bounceInLeft"}}>
//                         <div className="group">

//                           <input id="Password" name="Password" required="required" type="password"/>
//                           <span className="highlight"></span>
//                           <span className="bar"></span>
//                           <label className="contactLabel">Password <span>*</span>
//                           </label>
//                         </div>
//                       </div>
//                       <input type="submit" className="btn btn-warning btn-block btn_login" name="name" value="Login Now"/>
//                     </form>
//                     <br/>
//                     <p>OR</p>
//                     <br/>
//                     <a href="/mobilelogin" className="btn btn-warning btn-block btn_login">Login with SMS</a>
//                     <br/>
//                     <br/>
//                     <a href="/forgotpassword" className="f_pass">Forgot Password?</a>
//                     <br/>
//                     <a className="d_acco">Dont have an accont?</a>
//                     <a href="/register" className="g_reg">Get Registered</a>
//                   </div>
//                   <div className="clearfix"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       </GlobalLayout>
//         </>
//       )}
//     </>
//   );
// }

// SignIn.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (context) => {
//     try {
//       const { origin } = appUrl(context.req);
//       const response = await fetchData(`${origin}/api/home/settings`);
//       setSettingsData(store, response);
//       const { req, res } = context;
//       const session = await getSession({ req });
//       if (session && res && session.user) {
//         res.writeHead(302, {
//           Location: "/",
//         });
//         res.end();
//         return;
//       }

//       return {
//         session: undefined,
//         authCsrfToken: await getCsrfToken(context),
//       };
//     } catch (err) {
//       console.log(err);
//       return {
//         srvError: true,
//       };
//     }
//   },
// );

// SignIn.footer = false;


const Signin=()=>{
  return(
    <>
    </>
  )
}

export default Signin