import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout/Layout/Layout';
import Button from 'src/components/core/Button/Button';
import Card from 'src/components/core/Card/Card';
import { User } from 'src/models/User';
import { getFriends, unfriend } from 'src/services/UserService';
import classes from './FriendsPage.module.scss';
import { Link } from 'react-router-dom';
import FriendRequestsComponent from 'src/components/FriendRequestsComponent/FriendRequestsComponent';

const FriendsPage = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const loggedUserString = localStorage.getItem('user');
  const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

  const handleRemoveFriend = (friendId: number) => {
    unfriend(loggedUser.id, friendId).then(() => {
      setFriends(friends.filter((filteredFriend) => filteredFriend.id !== friendId));
    });
  };

  useEffect(() => {
    getFriends(loggedUser.id).then((response) => {
      const updatedFriends = response.map((friendship: { user: User; friend: User }) => {
        if (friendship.user.id === loggedUser.id) {
          return friendship.friend;
        } else {
          return friendship.user;
        }
      });
      setFriends(updatedFriends);
    });
  }, []);

  return (
    <Layout>
      <FriendRequestsComponent setFriends={setFriends} friends={friends} />
      <Card variant='large' title='Friends'>
        {friends &&
          friends.map((friend) => (
            <div key={friend.id} className={`${classes['c-friends__container']}`}>
              <Link to={`/profile/${friend.username}`} className={`${classes['c-friends__info']}`}>
                <span className={`${classes['c-friends__name']}`}>
                  {friend.name} {friend.surname}
                </span>
                <span className={`${classes['c-friends__username']}`}>{friend.username}</span>
              </Link>
              <Button
                onClick={() => handleRemoveFriend(friend.id)}
                variant='small'
                label='Remove friend'
              ></Button>
            </div>
          ))}
      </Card>
    </Layout>
  );
};

export default FriendsPage;
