import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
// import { useSelector } from 'react-redux';
import NavBar from './Navbar';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  // const userProfile = useSelector(state => state.session.user)

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
      <NavBar />
      <LogoutButton />
    </div>
  );
}
export default User;
