import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from '../core/Card/Card';
import Button from '../core/Button/Button';
import classes from './FriendRequestsComponent.module.scss';
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest
} from 'src/services/UserService';
import { User } from 'src/models/User';
import { Link } from 'react-router-dom';

interface FriendRequestsComponentProps {
  friends: User[];
  setFriends: Dispatch<SetStateAction<User[]>>;
}

const FriendRequestsComponent: React.FC<FriendRequestsComponentProps> = ({
  friends,
  setFriends
}) => {
  const [requests, setRequests] = useState<User[]>([]);

  const loggedUserString = localStorage.getItem('user');
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  const handleReject = (friendId: number) => {
    rejectFriendRequest(friendId, loggedUser.id).then(() => {});
    setRequests(requests.filter((friend) => friend.id !== friendId));
  };

  const handleAccept = (friend: User) => {
    acceptFriendRequest(loggedUser.id, friend.id).then(() => {
      setFriends([...friends, friend]);
      setRequests(requests.filter((friend) => friend.id !== friend.id));
    });
  };

  useEffect(() => {
    getFriendRequests(loggedUser.id).then((response) => {
      setRequests(response.map((response: { user: User }) => response.user));
    });
  }, []);

  return (
    <Card variant='large' title=''>
      <>
        <h3>Friend Requests</h3>
        {requests.map((friend) => (
          <div className={`${classes['c-requests__container']}`} key={friend.id}>
            <Link to={`/profile/${friend.username}`} className={`${classes['c-requests__info']}`}>
              <span className={`${classes['c-requests__name']}`}>
                {friend.name} {friend.surname}
              </span>
              <span className={`${classes['c-requests__username']}`}>{friend.username}</span>
            </Link>
            <div className={`${classes['c-requests__actions']}`}>
              <Button onClick={() => handleReject(friend.id)} variant='small' label='Reject' />
              <Button onClick={() => handleAccept(friend)} variant='small' label='Accept' />
            </div>
          </div>
        ))}
      </>
    </Card>
  );
};

export default FriendRequestsComponent;
