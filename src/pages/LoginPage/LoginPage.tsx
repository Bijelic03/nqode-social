import React, { useState } from 'react';
import Input from 'src/components/core/Input/Input';
import classes from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import AuthorizationLayout from 'src/components/Layout/AuthorizationLayout/AuthorizationLayout';
import Button from 'src/components/core/Button/Button';
import { CreateUser, User } from 'src/models/User';
import { getUser, login } from 'src/services/UserService';

const LoginPage = () => {
  const [user, setUser] = useState<CreateUser>({ username: '', password: '' });

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const validateFields = () => {
    if (Object.values(user).some((value) => value === '')) {
      setError('Please fill in all fields.');
      return;
    }
  };

  const handleSubmit = () => {
    validateFields();
    login(user).then((response) => {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.accessToken);
      getUser(user.username).then((response) => {
        const logedUser = JSON.stringify(response);
        localStorage.setItem('user', logedUser);
      });
      navigate('/');
    });
  };

  return (
    <AuthorizationLayout title='Login'>
      <Input
        name='username'
        onChange={handleChange}
        className={`${classes['c-login__input']}`}
        align='center'
        variant='large'
        placeholder='username'
      />
      <Input
        name='password'
        onChange={handleChange}
        className={`${classes['c-login__input']}`}
        align='center'
        variant='large'
        placeholder='password'
        type='password'
      />
      <div className={`${classes['c-login__actions']}`}>
        <Button onClick={() => handleSubmit()} variant='large' label='Login' />
        {error != '' && <p className={`${classes['c-login__error-message']}`}>{error}</p>}

        <span className={`${classes['c-login__actions-message']}`}>
          New to nQode?{' '}
          <span>
            <Link className={`${classes['c-login__link']}`} to={'/register'}>
              Sign up
            </Link>
          </span>
        </span>
      </div>
    </AuthorizationLayout>
  );
};

export default LoginPage;
