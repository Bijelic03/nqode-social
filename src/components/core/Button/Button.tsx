import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  color?: 'secondary';
  variant: string;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, color, variant, onClick, type }) => {
  return (
    <button
      className={`${classes['c-button']} ${classes[color ? `c-button--${color}` : '']} ${classes[`c-button--${variant}`]}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
