import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import Add from './Add';
import styles from '../../../../css-modules/AddModal.module.css'
import { BsPlusCircleFill } from "react-icons/bs";

function AddModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)} className={styles.buttonNav}>
                <BsPlusCircleFill className={styles.addIcon}/>
                <div>
                    New
                </div>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Add setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default AddModal;