import styles from '../../css-modules/SplashPage.module.css'
import SignUpFormModal from '../SplashNavBar/SignUpFormModal';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../SplashNavBar/LoginFormModal/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import homePageImage from '../assets/homepage.jpeg'

function SplashPage() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user)

    if (user) {
        const userId = user.id
        return <Redirect to={`/user/${userId}`} />;
    }

    return (
        <div className={styles.Centered}>
            <div className={styles.title1}>
                Tame your workouts, organize your fitness
            </div>
            <div className={styles.title2}>
                Remember everything and tackle any fitness goals with your notes, ideas, and routines all in one place.
            </div>
            <div className={styles.signup}>
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
            <img
                src={homePageImage}
                className={styles.homeImage}
                alt=''
            />
        </div>
    )
}

export default SplashPage;