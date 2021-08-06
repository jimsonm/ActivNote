
import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import LoginFormModal from './LoginFormModal';
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
        <div className={styles.button}>
          <LoginFormModal buttontext={'Login'} />
        </div>
      </div>
    </nav>
  );
}

export default SplashNavBar;
