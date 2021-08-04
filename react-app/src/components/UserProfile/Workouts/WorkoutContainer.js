import NavBar from "../Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getWorkouts, getWorkoutById } from '../../../store/workout'
import styles from '../../../css-modules/WorkoutContainer.module.css'
import ActivityContainer from "./ActivityContainer";
import { getActivities } from "../../../store/activity";
import { getCurrentWorkout } from '../../../store/current'
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";

function WorkoutContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const workouts = useSelector(state => Object.values(state.workout))
    const current = useSelector(state => state.current)
    const currWorkoutId = useSelector(state => state.current.currentWorkoutId)
    // const activities = useSelector(state => Object.values(state.activity))
    const [showActivities, setShowActivities] = useState(false)

    useEffect(() => {
        dispatch(getWorkouts(userId))
    }, [dispatch, userId])

    const displayActivities = async (id) => {
        const workout = await dispatch(getWorkoutById(id))
        await dispatch(getActivities(workout.id))
        await dispatch(getCurrentWorkout(workout.id))
        if (!showActivities) {
            await setShowActivities(true)
        } 
        if (showActivities && currWorkoutId === id) {
            setShowActivities(false)
        }
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
                            <div key={workout.id} className={styles.WorkoutNames}>
                                <div className={styles.iconsDiv}>
                                    {showActivities && current['currentWorkoutId'] === workout.id && (
                                        <GoTriangleDown onClick={() => displayActivities(workout.id)} className={styles.icon}/>
                                    )}
                                    {showActivities && current['currentWorkoutId'] !== workout.id && (
                                        <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon}/>
                                    )}
                                    {!showActivities && (
                                        <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon} />
                                    )}
                                    {workout.workout_name}
                                </div>
                                {current['currentWorkoutId'] === workout.id && showActivities && (
                                    <ActivityContainer />
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