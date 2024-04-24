import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  variant: 'small' | 'medium' | 'large';
  align?: 'center' | 'left';
  className?: string;
  color?: 'white' | 'gray';
}
const Input: React.FC<InputProps> = ({
  placeholder,
  defaultValue,
  onChange,
  value,
  variant,
  className,
  align = 'left',
  type,
  name,
  color = 'gray'
}) => {
  return (
    <input
      value={value}
      className={`${classes['c-input']} ${classes[`c-input--${color}`]} ${classes[`c-input--${variant}`]} ${className} ${classes[`c-input--align-${align}`]}`}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
      defaultValue={defaultValue}
    ></input>
  );
};

export default Input;
