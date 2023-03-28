import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {FormRow, FormSelect} from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { clearValues, createJob, editJob, handleChange } from '../../Features/JobSlice';
import { toast } from 'react-toastify';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    
  } = useSelector((store)=>store.jobs)
  const dispatch =useDispatch();
  
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!position || !company || !jobLocation){
      toast.warning('fill out all fields')
      return
    }
    if(isEditing){
      dispatch(editJob({position,company,jobLocation,jobType,status}))
      return
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
    dispatch(clearValues())
  }

  const inputChange=(e)=>{
    const {name,value}=e.target;
    const obj={name,value}
    dispatch(handleChange(obj))


  }
 

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            inputChange={inputChange}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            inputChange={inputChange}
          />

          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            inputChange={inputChange}
          />
          {/* job status */}
          <FormSelect name='status' value={status} inputChange={inputChange} list={statusOptions} />

          {/* job type */}
          <FormSelect name='jobType' value={jobType} inputChange={inputChange} list={jobTypeOptions} labelText='job Type' />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing?'Edit Job':'Add Job'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob