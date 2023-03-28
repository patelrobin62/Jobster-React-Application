import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FormRow} from '../../components'
import { handleChange, profileUpdate } from '../../Features/ProfileSlice'

 const Profile = () => {
  const {name,email,location,lastName,isLoading}=useSelector((store)=>store.profile)
  
  const dispatch=useDispatch()

  const inputChange=(e)=>{
    const {name,value}=e.target;
    const obj={name,value};
    dispatch(handleChange(obj))

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !location || !lastName){
      toast.warning('fill out all details')
      return
    }
    else{
    dispatch(profileUpdate({name,email,lastName,location}))
    }
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            inputChange={inputChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={lastName}
            inputChange={inputChange}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            inputChange={inputChange}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            inputChange={inputChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default Profile
