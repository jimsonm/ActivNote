import NavBar from "../Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getWorkouts, getWorkoutById } from '../../../store/workout'
import styles from '../../../css-modules/WorkoutContainer.module.css'
import ActivityContainer from "./ActivityContainer";
import { getActivities } from "../../../store/activity";
import { getCurrentWorkout } from '../../../store/current'

function WorkoutContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const workouts = useSelector(state => Object.values(state.workout))
    const current = useSelector(state => state.current)
    // const activities = useSelector(state => Object.values(state.activity))
    const [showActivities, setShowActivities] = useState(false)
    const [currWorkout, setCurrWorkout] = useState(null)
    console.log(workouts)

    useEffect(() => {
        dispatch(getWorkouts(userId))
        // dispatch(getActivities())
    }, [dispatch, userId])

    const displayActivities = async (id) => {
        const workout = await dispatch(getWorkoutById(id))
        await setShowActivities(true)
        // await setCurrWorkout(workout)
        await dispatch(getActivities(workout.id))
        await dispatch(getCurrentWorkout(workout.id))
    }

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
                            <div key={workout.id} className={styles.WorkoutNames} onClick={ () => displayActivities(workout.id)}>
                                {workout.workout_name}
                                {current['currentWorkoutId'] === workout.id && showActivities && (
                                    <ActivityContainer workout={currWorkout}/>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutContainer;