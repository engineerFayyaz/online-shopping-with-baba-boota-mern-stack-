import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import user from "./../../../models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { fetchData } from "../../../lib/clientFunctions";
import axios from "axios"

export default NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "CredentialsProvider",
      name: "CredentialsProvider",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let {password,email,phone,code} = credentials
        let user=null
       if(password){
        let {data}= await axios.post(`${process.env.NEXT_PUBLIC_API}/signin`,{email,password})
        if(data){
          user=data.user
         }
       }else{
        let {data}= await axios.post(`${process.env.NEXT_PUBLIC_API}/verifyotp`,{phone,code})
        if(data){
          user=data.user
         }
       } 
       
        if(user){
          return user
        }
        else{
           throw new Error("invalid user")
        }
       
      }
      
    }),
   
  
    // CredentialProvider({
    //   name: "Credentials",
     
    //   async authorize(credentials,req) {
    //     console.log("car",credentials)
    //     const { email , password , phone , otp } = credentials;
    //     console.log(phone, 'phone');
    //     let userData = null;
    //     console.log(password)
    //     if(email){
    //         console.log('email')
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/signin`,{email,password});
    //         console.log("res",response)
    //         userData =response;
    //     console.log(userData);
    //     }
    //     else{
    //       const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/signin`);
    //       userData =response;
    //       console.log(userData);
    //     }
    //     console.log(userData , password , phone);
    //     if (userData){
    //       if(password == "on"){
    //         return userData;
    //       }
    //       console.log(password , userData.hash)
    //       const validPassword = await bcrypt.compare(password, userData.hash);
    //       if (validPassword) {
    //         return userData;
    //       }
    //       return null;
    //     }
    //     return null;
    //   },
    // }),
  ],

 
  callbacks: {
    async signIn(account, profile) {
      console.log(account.account.provider)
      if(account.account.provider=="google"){
        let {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/socialsignup`,{email:account.profile.email,firstname:account.profile.given_name,lastname:account.profile.family_name});
        return true
      }
      if(account.account.provider=="facebook"){
        let {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/socialsignup`,{email:account.profile.email,firstname:account.profile.name,lastname:""});
        return true
      }
      console.log("signin",typeof(account.account.provider))
      console.log("signin",account.profile)
      return true

    },
    async session({ session, user, token }) {
      let {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/getsocialprofile`,{email:token.email});
   session.user.email=token.email
   session.user.id=data.user
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user && user._id){
       token.id=user._id
      }
      return token
    }

},
secret: process.env.SECRET,

  // jwt: {
  //   signingKey: '{"kty":"oct","kid":"5IzcK5BOB_Y39wXqzIaKnasAL8p6fod4l-XeHnPKb6g","alg":"HS512","k":"qtbl02eqNhVjI4Wqlt5qdMgV_k_ORPOt5FDCbCRPnFk"}',
  // },
  // session: {
  //   jwt: true,
  //   maxAge: 3 * 60 * 60, // 3hr
  // },
  // callbacks: {
  //   jwt: async (token, user, account, profile, isNewUser) => {
  //       console.log(user , 'sfkdsjfsdflksdjflkdjs')
  //     const userData = user && {
  //       id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       a: user.isAdmin ? user.isAdmin : false,
  //     };
  //     user && (token.user = userData);
  //     return Promise.resolve(token);
  //   },
  //   session: async (session, user, sessionToken) => {
  //     session.user = user.user;
  //     return Promise.resolve(session);
  //   },
  //   async redirect(url, baseUrl) {
  //     // v4
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return new URL(url, baseUrl).toString();
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   },
  // },
  // database: process.env.MONGO_URI,
 
});
