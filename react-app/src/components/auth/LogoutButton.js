import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { BiLogOut } from "react-icons/bi";
import styles from '../../css-modules/Logout.module.css'
import { clearAllActivities } from '../../store/activity';
import { clearCurrentValues } from '../../store/current';
import { clearAllExercises } from '../../store/exercise';
import { clearAllWorkouts } from '../../store/workout';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearAllActivities());
    await dispatch(clearCurrentValues());
    await dispatch(clearAllExercises());
    await dispatch(clearAllWorkouts());
  };

  return (
    <div onClick={onLogout} className={styles.LogoutDiv}>
      <BiLogOut className={styles.icons}/>
      Logout
    </div>
  )
};

export default LogoutButton;
