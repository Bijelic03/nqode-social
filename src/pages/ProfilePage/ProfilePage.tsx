import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout/Layout';
import Card from 'src/components/core/Card/Card';
import { User } from 'src/models/User';
import { getUser, update } from 'src/services/UserService';
import classes from './ProfilePage.module.scss';
import Button from 'src/components/core/Button/Button';
import Input from 'src/components/core/Input/Input';

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [showEdit, setShowEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState('');
  const [surnameEdit, setSurnameEdit] = useState('');

  const { username } = useParams<{ username: string }>();

  const logedUserString = localStorage.getItem('user');
  const logedUser = logedUserString ? JSON.parse(logedUserString) : null;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameEdit(event.target.value);
  };

  const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameEdit(event.target.value);
  };

  const handleShowEdit = useCallback(() => {
    setShowEdit(!showEdit);
  }, [showEdit]);

  const handleEditSubmit = useCallback(() => {
    if (nameEdit && surnameEdit) {
      const updatedUser = { ...user!, name: nameEdit, surname: surnameEdit };
      update(updatedUser).then((response) => {
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
      });
      handleShowEdit();
    }
  }, [nameEdit, surnameEdit, user, handleShowEdit]);

  useEffect(() => {
    if (username) {
      getUser(username).then((response) => {
        setUser(response);
        setNameEdit(response.name);
        setSurnameEdit(response.surname);
      });
    }
  }, [username]);

  return (
    <Layout>
      {user ? (
        <Card variant='large'>
          <span className={`${classes['c-profile__background']}`} />
          <div className={`${classes['c-profile__container']}`}>
            <span className={`${classes['c-profile__picture']}`} />
            {!showEdit ? (
              <div className={`${classes['c-profile__info']}`}>
                <h1>
                  {user.name} {user.surname}
                </h1>
                <p className={`${classes['c-profile__username']}`}>{user.username}</p>
                <p>{user.email}</p>
              </div>
            ) : (
              <div className={`${classes['c-profile__edit-wrapper']}`}>
                <Input
                  onChange={handleChangeName}
                  defaultValue={user.name}
                  variant='medium'
                  placeholder='name'
                />
                <Input
                  onChange={handleChangeSurname}
                  defaultValue={user.surname}
                  variant='medium'
                  placeholder='surname'
                />
              </div>
            )}
            <div className={`${classes['c-profile__edit-actions']}`}>
              {logedUser.username == user.username ? (
                <Button
                  label={showEdit ? 'Cancel' : 'Edit'}
                  onClick={handleShowEdit}
                  variant='small'
                />
              ) : (
                <Button variant='small' label='Add friend' />
              )}
              {showEdit && <Button onClick={handleEditSubmit} variant='small' label='save' />}
            </div>
          </div>
        </Card>
      ) : (
        <Card variant='large' title='User not found.' />
      )}
    </Layout>
  );
};

export default ProfilePage;
