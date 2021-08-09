import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExercises } from '../../../store/exercise'
import { editActivity, deleteActivity } from '../../../store/activity'
import { useParams } from 'react-router-dom'
import { getCurrentExercise, getCurrentActivity } from '../../../store/current'
import styles from '../../../css-modules/ActivityContainer.module.css'
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FaRegEdit, FaSave, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import AddActivityModal from './AddActivityModal'

function ActivityContainer({setShowIcons}) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => state.exercise)
    const currActivityId = useSelector(state => state.current.currentActivityId)
    const [details, setDetails] = useState(false)
    const [isInput, setIsInput] = useState(false)
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState(0);
    const [errors, setErrors] = useState('');
    const [showAddActivityModal, setShowAddActivityModal] = useState(false);

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const expandDetails = (e, activity) => {
        e.stopPropagation();
        dispatch(getCurrentActivity(activity.id))
        dispatch(getCurrentExercise(activity.exercise_id))
        if (!details) {
            setDetails(true)
            setShowIcons(true)
        }
        if (details && currActivityId === activity.id) {
            setDetails(false)
            setShowIcons(false)
        }
    }


    const edit = (e, activity) => {
        e.stopPropagation();
        e.preventDefault();
        setIsInput(true)
        setSets(activity.sets)
        setReps(activity.repetitions)
        setDuration(activity.duration)
    }

    const updateActivity = async (e, activity) => {
        if (!Number(sets) || !Number(reps) || !Number(duration)) {
            setErrors('Please make sure all inputs are non-zero integer values.')
        } else {
            e.stopPropagation();
            e.preventDefault();
            setIsInput(false)
            const payload = {
                activityId: activity.id,
                workoutId: activity.workout_id,
                sets,
                reps,
                duration
            }
            dispatch(editActivity(payload))
            setErrors('');
        }
    }

    const removeActivity = async (e, activity) => {
        e.preventDefault();
        const payload = {
            activityId: activity.id
        }
        dispatch(deleteActivity(payload))
    }

    const showAddModal = () => {
        setShowAddActivityModal(true)
    }

    return (
        <div>
            <div className={styles.iconsDiv}>
                <div className={styles.title}>
                    Exercises
                </div>
                <FaPlusSquare onClick={showAddModal} className={styles.icon} />
            </div>
            {showAddActivityModal && (
                <AddActivityModal setShowAddActivityModal={setShowAddActivityModal} />
            )}
            {activities.map((activity) => (
                <div key={activity.id} className={styles.indivActivity}>
                    <div className={styles.indivActivityContainer}>
                        <div className={styles.iconsDiv}>
                            {details && currActivityId === activity.id && (
                                <GoChevronDown onClick={(e) => expandDetails(e, activity)} className={styles.icon} />
                            )}
                            {details && currActivityId !== activity.id && (
                                <GoChevronRight onClick={(e) => expandDetails(e, activity)} className={styles.icon} />
                            )}
                            {!details && (
                                <GoChevronRight onClick={(e) => expandDetails(e, activity)} className={styles.icon} />
                            )}
                            <div className={styles.iconSpacing}>
                            <div>
                                {exercises[activity.exercise_id]?.exercise_name}
                            </div>
                            <div>
                            {!isInput && currActivityId === activity.id && details && (
                                <>
                                    <FaRegEdit onClick={(e) => edit(e, activity)} className={styles.iconR} />
                                </>
                            )}
                            {isInput && currActivityId === activity.id && details && (
                                <>
                                    <FaSave onClick={(e) => updateActivity(e, activity)} className={styles.iconR} />
                                </>
                            )}
                            {!isInput && currActivityId === activity.id && details && (
                                <>
                                    <FaTrashAlt onClick={(e) => removeActivity(e, activity)} className={styles.iconR} />
                                </>
                            )}
                            </div>
                            </div>
                        </div>
                        {currActivityId === activity.id && details && (
                            <>
                                {errors && (
                                    <div className={styles.errors}>
                                        {errors}
                                    </div>
                                )}
                                {!isInput && (
                                    <>
                                        <div className={styles.activityInfo}>
                                            {`Sets:`}
                                            <br/>
                                            {activity.sets}
                                        </div>
                                        <div className={styles.activityInfo}>
                                            {`Reps:`}
                                            <br/>
                                            {activity.repetitions}
                                        </div>
                                        <div className={styles.activityInfo}>
                                            {`Duration (in minutes):`}
                                            <br/>
                                            {activity.duration}
                                        </div>
                                    </>
                                )}
                                {isInput && (
                                    <>
                                        <form>
                                            <div className={styles.activityInfo}>
                                                {`Sets: `}
                                                <br/>
                                                <input
                                                    type='text'
                                                    name='sets'
                                                    value={sets}
                                                    onChange={(e) => setSets(e.target.value)}
                                                    className={styles.inputs}
                                                />
                                            </div>
                                            <div className={styles.activityInfo}>
                                                {`Reps: `}
                                                <input
                                                    type='text'
                                                    name='reps'
                                                    value={reps}
                                                    onChange={(e) => setReps(e.target.value)}
                                                    className={styles.inputs}
                                                />
                                            </div>
                                            <div className={styles.activityInfo}>
                                                {`Duration (in minutes): `}
                                                <input
                                                    type='text'
                                                    name='duration'
                                                    value={duration}
                                                    onChange={(e) => setDuration(e.target.value)}
                                                    className={styles.inputs}
                                                />
                                            </div>
                                        </form>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActivityContainer;