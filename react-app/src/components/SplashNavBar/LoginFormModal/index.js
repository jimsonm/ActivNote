import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import LoginForm from './LoginForm';

function LoginFormModal({buttontext}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{buttontext}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;