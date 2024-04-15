import React from 'react';
import Input from '../../core/Input/Input';
import classes from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import 'src/styles/settings.scss';
import logo from 'src/assets/nqode.webp';
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/solid';

const Navigation = () => {
  return (
    <nav className={`${classes['l-navigation']}`}>
      <div className={`${classes['l-navigation__container']}`}>
        <Link to={'/'}>
          <img src={logo} className={`${classes['l-navigation__logo']}`}></img>
        </Link>
        <Input placeholder='Start typing to search..' variant='large' />
        <ul className={`${classes['l-navigation__list']}`}>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={'/'}>
              <HomeIcon className={`${classes['l-navigation__icon']}`} />
            </Link>
          </li>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={'/profile'}>
              <UserIcon className={`${classes['l-navigation__icon']}`} />
            </Link>
          </li>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={'/chat'}>
              <ChatBubbleLeftRightIcon
                className={`${classes['l-navigation__icon']}`}
                width={32}
                height={32}
              />
            </Link>
          </li>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={'/friends'}>
              <UserGroupIcon className={`${classes['l-navigation__icon']}`} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
