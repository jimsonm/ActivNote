import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../../store/session'
import styles from '../../../css-modules/SignUpForm.module.css'
import LoginForm from '../LoginFormModal/LoginForm';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(['Passwords do not match.'])
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(email, password));
      if (data) {
        setErrors(data)
      }
      const id = data.id
      history.push(`/user/${id}`)
    }
  };

  const signIn = () => {
    setShowLoginForm(true)
  }

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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/user/${user.id}`} />;
  }

  if (showLoginForm) {
    return <LoginForm />
  }
  else return (
    <div className={styles.SignUpFormContainer}>
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
      <form onSubmit={onSignUp} className={styles.Form}>
        <div className={styles.CenterText}>
          <div className={styles.ErrorDiv}>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              required={true}
              className={styles.inputs}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
              required={true}
              className={styles.inputs}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='Confirm Password'
              required={true}
              className={styles.inputs}
            ></input>
          </div>
          <button type='submit' className={styles.buttons}>Sign Up</button>
        </div>
      </form>
      <div className={styles.CenterText}>
        Already have an account?
      </div>
      <div className={styles.CenterText}>
        <button className={styles.haveAccountSignInButton} onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
