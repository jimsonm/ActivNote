import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import SignUpForm from './SignUpForm';

function SignUpFormModal({buttontext}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{buttontext}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;