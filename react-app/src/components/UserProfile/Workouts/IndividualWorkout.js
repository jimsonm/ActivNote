import styles from '../../../css-modules/WorkoutContainer.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import ActivityContainer from './ActivityContainer';
import { getWorkoutById } from '../../../store/workout'
import { getActivities } from "../../../store/activity";
import { getCurrentActivity, getCurrentWorkout } from '../../../store/current'
import { deleteWorkout, editWorkout } from '../../../store/workout'

function IndividualWorkout({ workout }) {
    const dispatch = useDispatch()
    const current = useSelector(state => state.current)
    const currWorkoutId = useSelector(state => state.current.currentWorkoutId)
    const [showActivities, setShowActivities] = useState(false)
    const [showIcons, setShowIcons] = useState(false)
    const [workoutForm, setWorkoutForm] = useState(false)
    const [workout_name, setWorkout_Name] = useState(workout.workout_name)

    useEffect(() => {
        return function cleanup() {
            dispatch(getCurrentActivity(0))
            dispatch(getCurrentWorkout(0))
        }
    },[])

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
        if (!showIcons && currWorkoutId === id && showActivities) {
            setShowIcons(true)
        } else if (showIcons && currWorkoutId === id && !showActivities) {
            setShowIcons(false)
        }
    }

    const removeWorkout = async () => {
        dispatch(deleteWorkout(workout))
    }

    const showEditWorkout = () => {
        setWorkoutForm(true)
    }

    const updateWorkout = async (e) => {
        e.preventDefault()
        console.log(workout)
        const payload = {
            workout_name: workout_name,
            user_id: workout.user_id,
            id: workout.id
        }
        dispatch(editWorkout(payload))
        setWorkoutForm(false)
    }

    return (
        <>
            <div key={workout.id} className={styles.WorkoutNames}>
                <div className={styles.workoutTitleDiv}>
                    <div className={styles.iconsDiv1}>
                        {showActivities && current['currentWorkoutId'] === workout.id && (
                            <GoTriangleDown onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {showActivities && current['currentWorkoutId'] !== workout.id && (
                            <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {!showActivities && (
                            <GoTriangleRight onClick={() => displayActivities(workout.id)} className={styles.icon} />
                        )}
                        {!workoutForm && (
                            <>
                                {workout.workout_name}
                            </>
                        )}
                        {workoutForm && (
                            <form className={styles.form}>
                                <input
                                    type='text'
                                    name='name'
                                    value={workout_name}
                                    onChange={(e) => setWorkout_Name(e.target.value)}
                                    className={styles.inputs}
                                />
                            </form>
                        )}
                    </div>
                    <div className={styles.iconsDiv2}>
                        {!showIcons && current['currentWorkoutId'] === workout.id && (
                            <>
                                {!workoutForm && (
                                    <>
                                        <FaRegEdit className={styles.iconR} onClick={showEditWorkout} />
                                        <FaTrashAlt className={styles.iconR} onClick={removeWorkout} />
                                    </>
                                )}
                                {workoutForm && (
                                    <FaSave className={styles.iconR} onClick={updateWorkout}/>
                                )}
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