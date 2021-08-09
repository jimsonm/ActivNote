import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NavBar from './Navbar';
import styles from '../../css-modules/index.module.css'
import { getExercises } from '../../store/exercise'
import { useDispatch, useSelector } from 'react-redux'
import { redirected } from '../../store/current'

function User() {
  let history = useHistory();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();
  // const userProfile = useSelector(state => state.session.user)
  const exercises = useSelector(state => Object.values(state.exercise))

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

  useEffect(() => {
    dispatch(getExercises(userId))
  }, [dispatch, userId])

  if (!user) {
    return null;
  }

  const redirect = async (id) => {
    const payload = {
      status: true,
      exerciseId: id
    }
    dispatch(redirected(payload))
    history.push(`/user/${userId}/exercises`)
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.homeContainer}>
        <div className={styles.welcome}>
          Welcome to ActivNote!
        </div>
        <div className={styles.welcome2}>
          Take control of your fitness by organizing and creating your own workouts.
        </div>
        <div className={styles.previewContainerDiv}>
          <div className={styles.previewContainer}>
            <div className={styles.title}>
              Exercises
            </div>
            <div className={styles.exercisesList}>
              {exercises.length === 0 && (
                <div className={styles.noExercises}>
                  You currently have no exercises. Try creating one to start your fitness journey!
                </div>
              )}
              {exercises.map((exercise) => (
                <div onClick={() => redirect(exercise.id)} className={styles.exerciseInfoContainer} key={exercise.id}>
                  <div className={styles.exerciseTitle}>
                    {exercise.exercise_name}
                  </div>
                  <div className={styles.exerciseNotes}>
                    {exercise.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
