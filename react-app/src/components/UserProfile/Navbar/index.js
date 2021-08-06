import { useParams, NavLink } from 'react-router-dom';
import styles from '../../../css-modules/NavBar.module.css';
import AddModal from './AddModal';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaHome, FaDumbbell, FaUser } from "react-icons/fa";
import LogoutButton from '../../auth/LogoutButton';
import { GiMuscleUp } from "react-icons/gi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";


function NavBar() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const userProfile = useSelector(state => state.session.user)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }
    return (
        <div className={styles.NavBar}>
            {/* <div className={styles.NavDiv}>
                {userProfile.id}
            </div> */}
            <div className={styles.NavDiv}>
                <FaUser className={styles.icons}/>
                {userProfile.email}
            </div>
            <AddModal />
            <NavLink to={`/user/${userId}`} exact={true} className={styles.NavDiv}>
                <FaHome className={styles.icons} />
                <div>
                    Home
                </div>
            </NavLink>
            <NavLink to={`/user/${userId}/exercises`} exact={true} className={styles.NavDiv}>
                <FaDumbbell className={styles.icons} />
                <div>
                    Exercises
                </div>
            </NavLink>
            <NavLink to={`/user/${userId}/workouts`} exact={true} className={styles.NavDiv}>
                <GiMuscleUp className={styles.icons} />
                <div>
                    Workouts
                </div>
            </NavLink>
            <a href='https://github.com/jimsonm/ActivNote' target='_blank' rel='noopener noreferrer' className={styles.NavDiv}>
                <AiFillGithub className={styles.icons} />
                Github
            </a>
            <a href='https://www.linkedin.com/in/jimson-ma-462197213/' target='_blank' rel='noopener noreferrer' className={styles.NavDiv}>
                <AiFillLinkedin className={styles.icons} />
                Linkedin
            </a>
            <LogoutButton />
        </div>
    )
}

export default NavBar;