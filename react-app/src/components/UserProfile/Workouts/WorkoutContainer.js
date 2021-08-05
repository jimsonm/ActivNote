import NavBar from "../Navbar";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkouts } from '../../../store/workout'
import styles from '../../../css-modules/WorkoutContainer.module.css'
import IndividualWorkout from "./IndividualWorkout";

function WorkoutContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const workouts = useSelector(state => Object.values(state.workout))

    useEffect(() => {
        dispatch(getWorkouts(userId))
    }, [dispatch, userId])

    return (
        <div className={styles.WorkoutContainer}>
            <NavBar />
            <div className={styles.InnerWorkoutContainer}>
                <div className={styles.WorkoutNameContainer}>
                    <div className={styles.title}>
                        Workouts
                    </div>
                    <div className={styles.individualWorkoutContainer}>
                        {workouts.map((workout) => (
                            <IndividualWorkout workout={workout} key={workout.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutContainer;