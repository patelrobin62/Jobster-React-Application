import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from "../assets/wrappers/SearchContainer";
import { clearFilters, handleChange } from '../Features/AllJobsSlice';
import FormRow from './FormRow';
import FormSelect from './FormSelect';

const SearchContainer = () => {
  const {search,status,type,sort,statusOptions,typeOptions,sortOptions,isLoading}=useSelector((store)=>store.allJobs)
  const dispatch=useDispatch()

const inputChange=(e)=>{
  const {name,value}=e.target
  const obj={name,value}
  dispatch(handleChange(obj))
  

}

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Jobs</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            inputChange={inputChange}
          />
          <FormSelect
            name="status"
            value={status}
            list={statusOptions}
            inputChange={inputChange}
          />
          <FormSelect
            name="jobType"
            labelText='Job Type'
            value={type}
            list={typeOptions}
            inputChange={inputChange}
          />
          <FormSelect
            name="sort"
            value={sort}
            list={sortOptions}
            inputChange={inputChange}
          />
          <button type='button' onClick={()=>dispatch(clearFilters())} disabled={isLoading} className='btn btn-block btn-danger'>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer