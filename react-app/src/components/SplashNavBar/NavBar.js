
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from './SignUpFormModal';
import styles from '../../css-modules/SplashPageNavBar.module.css'

const SplashNavBar = () => {
  return (
    <nav className={styles.navBarContainer}>
      <div>
        ActivNote
      </div>
      <div className={styles.navBarButtonDiv}>
        <LoginFormModal buttontext={'Log In'}/>
        <SignUpFormModal buttontext={'Sign Up'}/>
        <LogoutButton />
      </div>
      {/* <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li> */}
      {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li> */}
    </nav>
  );
}

export default SplashNavBar;
