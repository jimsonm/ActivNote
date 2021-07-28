import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import LoginForm from './LoginForm';
import styles from '../../../css-modules/LoginButton.module.css'

function LoginFormModal({buttontext}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.loginButton}>{buttontext}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;