import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  color?: 'secondary' | 'primary';
  variant: string;
  label?: string;
  type?: 'submit' | 'reset' | 'button';
  outline?: 'none' | 'solid';
  onClick?: () => void;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = 'primary',
  variant,
  onClick,
  type,
  outline = 'solid',
  icon: Icon
}) => {
  return (
    <button
      className={`${classes['c-button']} ${classes[`c-button--outline--${outline}`]} ${classes[`c-button--${color}`]} ${classes[`c-button--${variant}`]}`}
      onClick={onClick}
      type={type}
    >
      {Icon ? (
        <div className={`${classes['c-button__wrapper']}`}>
          {<Icon className={`${classes['c-button__icon']}`} />}{' '}
          {label ? <span className={`${classes['c-button__label']}`}>{label}</span> : <></>}
        </div>
      ) : (
        <span className={`${classes['c-button__label']}`}>{label}</span>
      )}
    </button>
  );
};

export default Button;
