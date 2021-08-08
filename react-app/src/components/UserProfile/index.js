import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './Navbar';
import styles from '../../css-modules/index.module.css'
import { getExercises } from '../../store/exercise'
import { useDispatch, useSelector } from 'react-redux'

function User() {
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
              {exercises.map((exercise) => (
                <div className={styles.exerciseInfoContainer}>
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
