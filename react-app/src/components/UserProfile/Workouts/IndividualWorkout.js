import styles from '../../../css-modules/WorkoutContainer.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import ActivityContainer from './ActivityContainer';
// import { getWorkoutById } from '../../../store/workout'
import { getActivities } from "../../../store/activity";
import { clearCurrentValues, getCurrentWorkout } from '../../../store/current';
import { deleteWorkout, editWorkout } from '../../../store/workout';
import { getExercises } from '../../../store/exercise';
import { useParams } from 'react-router-dom';

function IndividualWorkout({ workout }) {
    const dispatch = useDispatch()
    const { userId } = useParams();
    const current = useSelector(state => state.current)
    const currWorkoutId = useSelector(state => state.current.currentWorkoutId)
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => (state.exercise))
    const [showActivities, setShowActivities] = useState(false)
    const [showIcons, setShowIcons] = useState(false)
    const [workoutForm, setWorkoutForm] = useState(false)
    const [workout_name, setWorkout_Name] = useState(workout.workout_name)
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        console.log('activities', activities)
        let totalCal = 0;
        let totalDur = 0;
        if (exercises !== {} && activities.length > 0 && current !== {}) {
            console.log('exe', exercises, 'act', activities, 'cur', current)
            activities.forEach(activity => {
                let duration = activity.duration;
                let activityCal = (duration * exercises[activity.exercise_id]['calories_burned']);
                totalCal += activityCal
                totalDur += activity.duration
                setTotalCalories(totalCal)
                setTotalDuration(totalDur)
            })
        } else if (exercises === {} || activities.length === 0 || current === {}) {
            setTotalCalories(0)
            setTotalDuration(0)
        }
    }, [current])

    useEffect(() => {
        dispatch(getExercises(userId))
        return function cleanup() {
            dispatch(clearCurrentValues())
        }
    }, [dispatch, userId])

    const displayActivities = async () => {
        await dispatch(getActivities(workout.id))
        await dispatch(getCurrentWorkout(workout.id))
        if (!showActivities) {
            setShowActivities(true)
        }
        if (showActivities && currWorkoutId === workout.id) {
            setShowActivities(false)
        }
        if (!showIcons && currWorkoutId === workout.id && showActivities) {
            setShowIcons(true)
        } else if (showIcons && currWorkoutId === workout.id && !showActivities) {
            setShowIcons(false)
        }
        // console.log(activities);
        // else if (showIcons && currWorkoutId === workout.id && showActivities) {
        //     setShowIcons(false)
        // }
        //false and matching will display icons
    }

    const removeWorkout = async () => {
        dispatch(deleteWorkout(workout))
    }

    const showEditWorkout = () => {
        setWorkoutForm(true)
    }

    const updateWorkout = async (e) => {
        e.preventDefault()
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
                            <GoTriangleDown onClick={() => displayActivities()} className={styles.icon} />
                        )}
                        {showActivities && current['currentWorkoutId'] !== workout.id && (
                            <GoTriangleRight onClick={() => displayActivities()} className={styles.icon} />
                        )}
                        {!showActivities && (
                            <GoTriangleRight onClick={() => displayActivities()} className={styles.icon} />
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
                                    <FaSave className={styles.iconR} onClick={updateWorkout} />
                                )}
                            </>
                        )}
                    </div>
                </div>
                {current['currentWorkoutId'] === workout.id && showActivities && (
                    <ActivityContainer setShowIcons={setShowIcons} totalCalories={totalCalories} totalDuration={totalDuration} />
                )}
            </div>
        </>
    )
}

export default IndividualWorkout;