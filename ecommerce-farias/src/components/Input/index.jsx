import './style.css';
import React from 'react';

function Input({ inputId, label, register, required, errors, type, placeholder, onChange }) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input
        {...register(inputId, { required })}
        type={type || 'text'}
        id={inputId}
        placeholder={placeholder}
        className={errors[inputId] ? 'input-error' : ''}
        onChange={onChange}
      />
      {errors[inputId] && <span>{errors[inputId].message}</span>}
    </>
  );
}

export default Input;
