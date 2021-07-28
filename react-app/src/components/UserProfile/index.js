import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const userProfile = useSelector(state => state.session.user)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        {userProfile.id}
      </div>
      <div>
        {userProfile.email}
      </div>
      <NavLink to={`/user/${userId}/exercises`} exact={true}>
        To exercises
      </NavLink>
      <LogoutButton />
    </div>
  );
}
export default User;
