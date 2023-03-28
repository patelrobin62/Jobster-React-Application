import React from 'react'
import { useDispatch } from 'react-redux';
import { handleChange } from '../Features/UserSlice';


const FormRow = ({type,name,value,inputChange,labelText}) => {
  

  
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={inputChange}
        className="form-input"
      />
    </div>
  );
}

export default FormRow