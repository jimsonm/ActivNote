
import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from './SignUpFormModal';
import styles from '../../css-modules/SplashPageNavBar.module.css'
import { login } from '../../store/session'

const SplashNavBar = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const DemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
    history.push('/user/1')
  }

  return (
    <nav className={styles.navBarContainer}>
      <div>
        ActivNote
      </div>
      <div className={styles.navBarButtonDiv}>
        <div className={styles.button}>
          <button onClick={DemoLogin} className={styles.demoButton}>Demo</button>
        </div>
        {/* <div className={styles.button}>
          <SignUpFormModal buttontext={'Sign Up'} />
        </div> */}
        <div className={styles.button}>
          <LoginFormModal buttontext={'Login'} />
        </div>
      </div>
    </nav>
  );
}

export default SplashNavBar;
