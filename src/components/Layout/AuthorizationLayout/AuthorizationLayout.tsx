import React from 'react';
import classes from './AuthorizationLayout.module.scss';
import Card from 'src/components/core/Card/Card';
import logo from 'src/assets/nQode-logo-white.svg';

interface AuthorizationLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

const AuthorizationLayout: React.FC<AuthorizationLayoutProps> = ({ children, title }) => {
  return (
    <div className={`${classes['l-layout']}`}>
      <div className={`${classes['l-layout__container']}`}>
        <img src={logo} alt='' className={`${classes['l-layout__logo']}`} />
        <Card variant='large' title={title}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthorizationLayout;
