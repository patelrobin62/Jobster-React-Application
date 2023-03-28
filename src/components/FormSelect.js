import React from 'react'

const FormSelect = ({name,value,inputChange,labelText,list}) => {
  return (
    <div className="form-row">
      <label htmlFor="status" className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={inputChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelect