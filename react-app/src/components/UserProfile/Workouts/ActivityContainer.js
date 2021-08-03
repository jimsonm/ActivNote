import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editExercise, getExercises } from '../../../store/exercise'
import { getActivities, editActivity } from '../../../store/activity'
import { useParams } from 'react-router-dom'
import { getCurrentExercise } from '../../../store/current'
import styles from '../../../css-modules/ActivityContainer.module.css'
import { GoPlusSmall } from "react-icons/go";
import { FaRegEdit, FaSave } from "react-icons/fa";

function ActivityContainer({ workout }) {
    console.log(workout)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => state.exercise)
    const currEx = useSelector(state => state.current.currentExerciseId)
    const [details, setDetails] = useState(false)
    const [isInput, setIsInput] = useState(false)
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState(0);
    console.log(exercises)

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const expandDetails = (e, activity) => {
        e.stopPropagation();
        dispatch(getCurrentExercise(activity.exercise_id))
        if (!details) {
            setDetails(true)
        }
        if (details && currEx === activity.exercise_id) {
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
    }

    return (
        <div>
            Exercises
            {activities.map((activity) => (
                <div>
                    <div>
                        <div className={styles.iconsDiv}>
                            <GoPlusSmall onClick={(e) => expandDetails(e, activity)} />
                            {exercises[activity.exercise_id]?.exercise_name}
                            {!isInput && currEx === activity.exercise_id && details && (
                                <FaRegEdit onClick={(e) => edit(e, activity)} />
                            )}


                            {isInput && currEx === activity.exercise_id && details && (
                                <FaSave onClick={(e) => updateActivity(e, activity)} />
                            )}
                        </div>
                        {currEx === activity.exercise_id && details && (
                            <>
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