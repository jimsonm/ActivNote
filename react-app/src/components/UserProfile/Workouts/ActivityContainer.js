import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editExercise, getExercises } from '../../../store/exercise'
import { getActivities } from '../../../store/activity'
import { useParams } from 'react-router-dom'

function ActivityContainer({ workout }) {
    console.log(workout)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const activities = useSelector(state => Object.values(state.activity))
    const exercises = useSelector(state => state.exercise)
    const [details, setDetails] = useState(false)
    console.log(exercises)

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const expandDetails = (e) => {
        e.stopPropagation();
        setDetails(true)
    }

    return (
        <div>
            {activities.map((activity) => (
                <div>
                    <div onClick={expandDetails}>
                        {exercises[activity.exercise_id]?.exercise_name}
                        {details && (
                            <div>
                                {exercises[activity.exercise_id]?.notes}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActivityContainer;