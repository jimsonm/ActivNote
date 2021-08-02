import styles from '../../css-modules/SplashPage.module.css'
import SignUpFormModal from '../SplashNavBar/SignUpFormModal';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../SplashNavBar/LoginFormModal/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function SplashPage() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user)

    if (user) {
        const userId = user.id
        console.log(userId)
        return <Redirect to={`/user/${userId}`} />;
    }

    return (
        <div className={styles.Centered}>
            <div>
                Tame your work, organize your life
            </div>
            <div>
                Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
            </div>
            <div>
                <SignUpFormModal buttontext={'Sign up for free'} />
            </div>
            <div>
                <button className={styles.hasAccountButton} onClick={() => setShowModal(true)}>Already have an account? Log in</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default SplashPage;