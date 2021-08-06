import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { BiLogOut } from "react-icons/bi";
import styles from '../../css-modules/Logout.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div onClick={onLogout} className={styles.LogoutDiv}>
      <BiLogOut className={styles.icons}/>
      Logout
    </div>
  )
};

export default LogoutButton;
