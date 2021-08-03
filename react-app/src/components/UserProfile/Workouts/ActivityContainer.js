import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editExercise, getExercises } from '../../../store/exercise'
import { getActivities } from '../../../store/activity'
import { useParams } from 'react-router-dom'
import { getCurrentExercise } from '../../../store/current'

function ActivityContainer({ workout }) {
    console.log(workout)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => state.exercise)
    const currEx = useSelector(state => state.current.currentExerciseId)
    const [details, setDetails] = useState(false)
    console.log(exercises)

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const expandDetails = (e, activity) => {
        e.stopPropagation();
        dispatch(getCurrentExercise(activity.exercise_id))
        if (!details) {
            setDetails(true)
        } else {
            setDetails(false)
        }
    }

    return (
        <div>
            {activities.map((activity) => (
                <div>
                    <div onClick={(e) => expandDetails(e, activity)}>
                        {exercises[activity.exercise_id]?.exercise_name}
                        {currEx === activity.exercise_id && details && (
                            <>
                                {/* <div>
                                    {exercises[activity.exercise_id]?.notes}
                                </div> */}
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
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActivityContainer;