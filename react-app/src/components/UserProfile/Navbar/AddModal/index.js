import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import Add from './Add';

function AddModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>Add</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Add />
                </Modal>
            )}
        </>
    )
}

export default AddModal;