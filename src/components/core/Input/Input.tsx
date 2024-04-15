import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  variant: 'small' | 'medium' | 'large';
}
const Input: React.FC<InputProps> = ({ placeholder, onChange, value, variant }) => {
  return (
    <input
      value={value}
      className={`${classes['c-input']} ${classes[`c-input--${variant}`]}`}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
