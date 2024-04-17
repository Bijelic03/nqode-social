import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthorizationLayout from 'src/components/Layout/AuthorizationLayout/AuthorizationLayout';
import Input from 'src/components/core/Input/Input';
import classes from './RegisterPage.module.scss';
import Button from 'src/components/core/Button/Button';
import { User } from 'src/models/User';
import { register } from 'src/services/UserService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    email: '',
    name: '',
    surname: ''
  });

  const navigate = useNavigate();

  const [repeatPwd, setRepeatPwd] = useState('');

  const [error, setError] = useState('');

  const notify = () =>
    toast.success('Registration successful!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

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
      return false;
    }
    if (!user.email?.includes('@')) {
      setError('Please enter valid email.');
      return false;
    }
    if (user.password && user.password.length < 8) {
      setError('Password must have at least 8 characters.');
      return false;
    }
    if (user.password != repeatPwd) {
      setError(`Passwords don't match.`);
      return false;
    }
    return true;
  };

  const handleChangeRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRepeatPwd(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateFields()) return;
    console.log('aa');
    register(user)
      .then(() => {
        notify();
        navigate('/login');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <AuthorizationLayout title='Registration'>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          onChange={handleChange}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='username'
        />
        <Input
          name='email'
          onChange={handleChange}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='email'
        />
        <Input
          name='name'
          onChange={handleChange}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='name'
        />
        <Input
          name='surname'
          onChange={handleChange}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='surname'
        />
        <Input
          name='password'
          onChange={handleChange}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='password'
          type='password'
        />
        <Input
          name='repeatPassword'
          onChange={handleChangeRepeatPassword}
          className={`${classes['c-register__card-item']}`}
          align='center'
          variant='large'
          placeholder='repeat password'
          type='password'
        />
        <div className={`${classes['c-register__actions']}`}>
          <Button type='submit' variant='large' label='Register' />
          {error != '' && <p className={`${classes['c-register__error-message']}`}>{error}</p>}
          <span className={`${classes['c-register__actions-message']}`}>
            Already have an account?{' '}
            <span>
              <Link className={`${classes['c-register__link']}`} to={'/login'}>
                Sign in
              </Link>
            </span>
          </span>
        </div>
      </form>
    </AuthorizationLayout>
  );
};

export default RegisterPage;
