
import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
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
        <button onClick={DemoLogin}>Demo</button>
        <SignUpFormModal buttontext={'Sign Up'}/>
        <LoginFormModal buttontext={'Login'}/>
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
