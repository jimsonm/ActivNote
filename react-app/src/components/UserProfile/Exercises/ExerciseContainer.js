import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getExercises, getExerciseById } from '../../../store/exercise';
import ExerciseDetails from './SingleExercise';
import styles from '../../../css-modules/ExerciseContainer.module.css';
import NavBar from '../Navbar';

function ExerciseContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [currentExercise, setCurrentExercise] = useState(null);
    const exercises = useSelector(state => Object.values(state.exercise))
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const displayDetails = async (id) => {
        const exercise = await dispatch(getExerciseById(id))
        setCurrentExercise(exercise)
        setSelected(true)
    }

    return (
        <div className={styles.ExerciseContainer}>
            {/* <div className={styles.NavBar}>
                <NavLink to={`/user/${userId}`} exact={true}>
                    Home
                </NavLink>
                <NavLink to={`/user/${userId}/exercises`} exact={true}>
                    Exercises
                </NavLink>
            </div> */}
            <NavBar />
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
                {!selected && (
                    <div>
                        Please select an exercise to view its details.
                    </div>
                )}
                {currentExercise && selected && (
                    <ExerciseDetails exercise={currentExercise} />
                )}
            </div>
        </div>
    )
}

export default ExerciseContainer;