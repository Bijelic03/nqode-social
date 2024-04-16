import React from 'react';
import classes from './Card.module.scss';

interface CardProps {
  direction?: 'row' | 'column';
  title?: string;
  children: JSX.Element | JSX.Element[];
  variant: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  direction = 'column',
  variant,
  align = 'center'
}) => {
  return (
    <div className={`${classes['c-card']}  ${classes[`c-card--${variant}`]}`}>
      {title && (
        <h2 className={`${classes[`c-card__title--${align}`]} ${classes['c-card__title']} `}>
          {title}
        </h2>
      )}
      <div className={`${classes['c-card__content']} ${classes[`c-card__content--${direction}`]}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
