import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getExercises } from '../../../store/exercise';

function Exercises() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [])
    return (
        <div>
            Here are your exercises!
        </div>
    )
}

export default Exercises;