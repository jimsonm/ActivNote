import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import SignUpForm from './SignUpForm';
import styles from '../../../css-modules/SignUpButton.module.css'

function SignUpFormModal({buttontext}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.buttons}>{buttontext}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;