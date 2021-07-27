
import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from './SignUpFormModal';
import styles from '../../css-modules/SplashPageNavBar.module.css'
import { login } from '../../store/session'

const SplashNavBar = () => {
  const dispatch = useDispatch();

  const DemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
  }
  
  return (
    <nav className={styles.navBarContainer}>
      <div>
        ActivNote
      </div>
      <div className={styles.navBarButtonDiv}>
        <button onClick={DemoLogin}>Demo</button>
        <LoginFormModal buttontext={'Login'}/>
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
