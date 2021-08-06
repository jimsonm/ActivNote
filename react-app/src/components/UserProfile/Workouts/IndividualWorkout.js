import styles from '../../../css-modules/WorkoutContainer.module.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import ActivityContainer from './ActivityContainer';
import { getWorkoutById } from '../../../store/workout'
import { getActivities } from "../../../store/activity";
import { getCurrentWorkout } from '../../../store/current'
import { deleteWorkout } from '../../../store/workout'

function IndividualWorkout({workout}) {
    const dispatch = useDispatch()
    const current = useSelector(state => state.current)
    const currWorkoutId = useSelector(state => state.current.currentWorkoutId)
    const [showActivities, setShowActivities] = useState(false)
    const [showIcons, setShowIcons] = useState(false)

    const displayActivities = async (id) => {
        const workout = await dispatch(getWorkoutById(id))
        await dispatch(getActivities(workout.id))
        await dispatch(getCurrentWorkout(workout.id))
        if (!showActivities) {
            setShowActivities(true)
        }
        if (showActivities && currWorkoutId === id) {
            setShowActivities(false)
        }
        if(!showIcons && currWorkoutId === id && showActivities) {
            setShowIcons(true)
        } else if (showIcons && currWorkoutId === id && !showActivities) {
            setShowIcons(false)
        }
    }

    const removeWorkout = async () => {
        dispatch(deleteWorkout(workout))
    }

    const editWorkout = async () => {

    }

    return (
        <>
            <div key={workout.id} className={styles.WorkoutNames}>
                <div className={styles.workoutTitleDiv}>
                    <div className={styles.iconsDiv}>
                        {showActivities && current['currentWorkoutId'] === workout.id && (
                            <GoTriangleDown onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {showActivities && current['currentWorkoutId'] !== workout.id && (
                            <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {!showActivities && (
                            <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {workout.workout_name}
                    </div>
                    <div className={styles.iconsDiv}>
                        {!showIcons && current['currentWorkoutId'] === workout.id && (
                            <>
                                <FaRegEdit className={styles.iconR} />
                                <FaTrashAlt className={styles.iconR} onClick={removeWorkout}/>
                            </>
                        )}
                    </div>
                </div>
                {current['currentWorkoutId'] === workout.id && showActivities && (
                    <ActivityContainer setShowIcons={setShowIcons} />
                )}
            </div>
        </>
    )
}

export default IndividualWorkout;