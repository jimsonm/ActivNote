import { useParams, NavLink } from 'react-router-dom';
import styles from '../../../css-modules/NavBar.module.css';
import AddModal from './AddModal';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
            <div>
                {userProfile.id}
            </div>
            <div>
                {userProfile.email}
            </div>
            <AddModal />
            <NavLink to={`/user/${userId}`} exact={true}>
                Home
            </NavLink>
            <NavLink to={`/user/${userId}/exercises`} exact={true}>
                Exercises
            </NavLink>
        </div>
    )
}

export default NavBar;