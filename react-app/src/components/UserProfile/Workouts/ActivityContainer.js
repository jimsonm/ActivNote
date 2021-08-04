import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editExercise, getExercises } from '../../../store/exercise'
import { getActivities, editActivity, deleteActivity } from '../../../store/activity'
import { useParams } from 'react-router-dom'
import { getCurrentExercise } from '../../../store/current'
import styles from '../../../css-modules/ActivityContainer.module.css'
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FaRegEdit, FaSave, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import AddActivityModal from './AddActivityModal'

function ActivityContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => state.exercise)
    const currExerciseId = useSelector(state => state.current.currentExerciseId)
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
        dispatch(getCurrentExercise(activity.exercise_id))
        if (!details) {
            setDetails(true)
        }
        if (details && currExerciseId === activity.exercise_id) {
            setDetails(false)
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
            setErrors('Please make sure all inputs are integer values.')
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
                <FaPlusSquare onClick={showAddModal}/>
                Exercises
            </div>
            {showAddActivityModal && (
                <AddActivityModal setShowAddActivityModal={setShowAddActivityModal}/>
            )}
            {activities.map((activity) => (
                <div key={activity.id}>
                    <div>
                        <div className={styles.iconsDiv}>
                            {details && currExerciseId === activity.exercise_id && (
                                <GoChevronDown onClick={(e) => expandDetails(e, activity)} />
                            )}
                            {details && currExerciseId !== activity.exercise_id && (
                                <GoChevronRight onClick={(e) => expandDetails(e, activity)} />
                            )}
                            {!details && (
                                <GoChevronRight onClick={(e) => expandDetails(e, activity)} />
                            )}
                            <div>
                                {exercises[activity.exercise_id]?.exercise_name}
                            </div>
                            {!isInput && currExerciseId === activity.exercise_id && details && (
                                <>
                                    Edit
                                    <FaRegEdit onClick={(e) => edit(e, activity)} />
                                </>
                            )}


                            {isInput && currExerciseId === activity.exercise_id && details && (
                                <>
                                    Save Changes
                                    <FaSave onClick={(e) => updateActivity(e, activity)} />
                                </>
                            )}
                            {!isInput && currExerciseId === activity.exercise_id && details && (
                                <>
                                    Delete
                                    <FaTrashAlt onClick={(e) => removeActivity(e, activity)} />
                                </>
                            )}
                        </div>
                        {currExerciseId === activity.exercise_id && details && (
                            <>
                                {errors && (
                                    <div>
                                        {errors}
                                    </div>
                                )}
                                {!isInput && (
                                    <>
                                        <div>
                                            {`Sets: ${activity.sets}`}
                                        </div>
                                        <div>
                                            {`Reps: ${activity.repetitions}`}
                                        </div>
                                        <div>
                                            {`Duration: ${activity.duration} Minutes`}
                                        </div>
                                    </>
                                )}
                                {isInput && (
                                    <>
                                        <form>
                                            <div>
                                                {`Sets: `}
                                                <input
                                                    type='text'
                                                    name='sets'
                                                    value={sets}
                                                    onChange={(e) => setSets(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                {`Reps: `}
                                                <input
                                                    type='text'
                                                    name='reps'
                                                    value={reps}
                                                    onChange={(e) => setReps(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                {`Duration: `}
                                                <input
                                                    type='text'
                                                    name='duration'
                                                    value={duration}
                                                    onChange={(e) => setDuration(e.target.value)}
                                                />
                                                {`Minutes`}
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