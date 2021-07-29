import { useParams, NavLink } from 'react-router-dom'
import styles from '../../../css-modules/NavBar.module.css'

function NavBar() {
    const { userId } = useParams();
    return (
        <div className={styles.NavBar}>
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