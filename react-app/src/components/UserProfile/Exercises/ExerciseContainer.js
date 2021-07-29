import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getExercises, getExerciseById } from '../../../store/exercise'
import ExerciseDetails from './SingleExercise';
import styles from '../../../css-modules/ExerciseContainer.module.css'

function ExerciseContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [currentExercise, setCurrentExercise] = useState(null);
    const exercises = useSelector(state => Object.values(state.exercise))

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const displayDetails = async (id) => {
        const exercise = await dispatch(getExerciseById(id))
        setCurrentExercise(exercise)
    }

    return (
        <div className={styles.ExerciseContainer}>
            <div className={styles.NavBar}>
                this is the navbar
                gnaoehfiawjoiwfjfoowei
            </div>
            <div className={styles.ExerciseNames}>
                <div>
                    Exercises
                </div>
                <div>
                    {exercises.map((exercise) => (
                        <div onClick={() => displayDetails(exercise.id)} key={exercise.id}>
                            {exercise.exercise_name}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.ExerciseDetails}>
                {currentExercise && (
                    <ExerciseDetails exercise={currentExercise} />
                )}
            </div>
        </div>
    )
}

export default ExerciseContainer;