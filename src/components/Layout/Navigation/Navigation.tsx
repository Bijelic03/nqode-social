import React, { useState } from 'react';
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
import { User } from 'src/models/User';
import { searchUsers } from 'src/services/UserService';

const Navigation = () => {
  const [searchResoults, setSearchResoults] = useState<User[]>([]);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchUsers(e.target.value).then((response) => {
        setSearchResoults(response);
      });
    } else {
      setSearchResoults([]);
    }
  };
  const handleLinkClick = () => {
    setSearchResoults([]);
  };
  return (
    <nav className={`${classes['l-navigation']}`}>
      <div className={`${classes['l-navigation__container']}`}>
        <Link to={'/'}>
          <img src={logo} className={`${classes['l-navigation__logo']}`}></img>
        </Link>
        <div className={`${classes['l-navigation__search-wrapper']}`}>
          <Input onChange={handleSearch} placeholder='Start typing to search..' variant='large' />
          <div className={`${classes['l-navigation__search-results']}`}>
            {searchResoults.map((filteredUser) => (
              <Link
                onClick={handleLinkClick}
                to={`/profile/${filteredUser.username}`}
                className={`${classes['l-navigation__search-item']}`}
              >
                {filteredUser.username}
              </Link>
            ))}
          </div>
        </div>
        <ul className={`${classes['l-navigation__list']}`}>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={'/'}>
              <HomeIcon className={`${classes['l-navigation__icon']}`} />
            </Link>
          </li>
          <li className={`${classes['l-navigation__list-item']}`}>
            <Link to={`/profile/${user.username}`}>
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
