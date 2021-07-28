import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session'
import styles from '../../../css-modules/LoginForm.module.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const DemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    const userId = user.id
    console.log(userId)
    return <Redirect to={`/user/${userId}`} />;
  }

  return (
    <div className={styles.LoginFormContainer}>
      <div className={styles.CenterText}>
        ActivNote
      </div>
      <div className={styles.CenterText}>
        Remember everything important.
      </div>
      <div className={styles.CenterText}>
        <button className={styles.buttons} onClick={DemoLogin}>
          Continue as Demo
        </button>
      </div>
      <div className={styles.horizontalRow}>
        or
      </div>
      <form onSubmit={onLogin} className={styles.Form}>
        <div className={styles.CenterText}>
          <div className={styles.ErrorDiv}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className={styles.inputs}
            />
          </div>
          {showPasswordField && (
            <div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className={styles.inputs}
              />
            </div>
          )}
          {showPasswordField === false && (
            <button onClick={() => setShowPasswordField(true)} className={styles.buttons}>Continue</button>
          )}
          {showPasswordField && (
            <button type='submit' className={styles.buttons}>Login</button>
          )}
        </div>
      </form>
      <div className={styles.CenterText}>
        Don't have an account?
      </div>
      <div className={styles.CenterText}>
        <button className={styles.createAccountButton}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
