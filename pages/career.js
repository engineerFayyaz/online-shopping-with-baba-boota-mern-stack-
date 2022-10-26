import React, { useState } from 'react'
import CarrerComponent from '../components/carrer/CarrerComponent'
import { toast } from 'react-toastify'
import axios from 'axios'
import GlobalLayout from '../components/Layout/GlobalLayout'

const carrer = ({title}) => {
    let [interests,setIntrests]=useState([])
    let [name,setName]=useState("")
    let [email,setEmail]=useState("")
    let [description,setDescription]=useState("")
    let [file,setFile]=useState(null)


    const onSubmit=(e)=>{
          e.preventDefault()
          if(!name || !email || !description || interests.length==0 || file==null ){
            toast.error("All Fields are required")
              
          }else{
            const formData = new FormData();
            formData.append("name",name)
            formData.append("email",email)
            formData.append("description",description)
            formData.append("interests",JSON.stringify(interests))
            formData.append("doc",file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post(`${process.env.NEXT_PUBLIC_API}/career/createjob`,formData,config).then((res)=>{
                if(res.data.success){
                    toast.success("Submit Successfully")
                }
            })
          }
         
    }
    const Interest=(val)=>{
       
        if(interests.includes(val)){
           let dat= interests.filter((a)=>{
              return a!==val
           })
           setIntrests(dat)
        }else{
            let dat=interests
            dat.push(val)
            setIntrests(dat)
        }
    }
  return (
    <>
          <GlobalLayout>
        <section>
            <div className="carrer-wrapper">
                <div className="left-box text-center">
                    <img src='/img/bababoota-logo.png' />
                    
                    <h2 style={{marginTop: "20px"}}>What interests you*?</h2>
                    <div className='custom-options'>
                        <CarrerComponent Interest={Interest} title="B2B" />
                        <CarrerComponent Interest={Interest}  title="Country Business" />
                        <CarrerComponent Interest={Interest}  title="Design" />
                        <CarrerComponent Interest={Interest}  title="Engineering" />
                        <CarrerComponent Interest={Interest}  title="Growth" />
                        <CarrerComponent Interest={Interest}  title="Leadership" />
                    </div>
                </div>
                <div className="right-box">
                    <h2>
                    Connect with us
                    </h2>
                 <form >
                    <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Your name*" />
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Your Email*" />
                    <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder="Write something*"></textarea>
                    <input onChange={(e)=>{setFile(e.target.files[0])}} style={{marginBottom:"15px"}} type="file" id="myfile" name="myfile" />
                    <input onClick={onSubmit} type="submit" value="Submit" />
                 </form>
                </div>
            </div>
        </section>
        </GlobalLayout>
    </>
  )
}

export default carrer