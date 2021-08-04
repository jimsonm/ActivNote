import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getExercises, getExerciseById } from '../../../store/exercise';
import ExerciseDetails from './ExerciseDetails';
import styles from '../../../css-modules/ExerciseContainer.module.css';
import NavBar from '../Navbar';

function ExerciseContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [currentExercise, setCurrentExercise] = useState(null);
    const exercises = useSelector(state => Object.values(state.exercise))
    const [selected, setSelected] = useState(false)
    const [isForm, setIsForm] = useState(false)

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    const displayDetails = async (id) => {
        const exercise = await dispatch(getExerciseById(id))
        await setCurrentExercise(exercise)
        await setSelected(true)
        await setIsForm(false)
    }

    return (
        <div className={styles.ExerciseContainer}>
            <NavBar />
            <div className={styles.InnerExerciseContainer}>
                <div className={styles.ExerciseNameContainer}>
                    <div className={styles.title}>
                        Exercises
                    </div>
                    <div>
                        <div className={styles.individualExerciseContainer}>
                            {exercises.map((exercise) => (
                                <div onClick={() => displayDetails(exercise.id)} key={exercise.id} className={styles.exerciseNames}>
                                    {exercise.exercise_name}
                                    <br />
                                    {exercise.notes}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.ExerciseDetails}>
                    {!selected && (
                        <div>
                            Please select an exercise to view its details.
                        </div>
                    )}
                    {currentExercise && selected && (
                        <ExerciseDetails exercise={currentExercise} setCurrentExercise={setCurrentExercise} setSelected={setSelected} isForm={isForm} setIsForm={setIsForm} />
                    )}
                </div>
            </div>
        </div>
    )

}

export default ExerciseContainer;