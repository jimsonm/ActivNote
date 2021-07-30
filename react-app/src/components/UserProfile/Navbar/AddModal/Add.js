import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../../../css-modules/AddModal.module.css'
import ExerciseForm from './AddExercise';
import WorkoutForm from './AddWorkout';

function Add() {
    const [createExercise, setCreateExercise] = useState(false);
    const [createWorkout, setCreateWorkout] = useState(false);
    const [chosen, setChosen] = useState(false);

    const openExerciseForm = () => {
        setChosen(true)
        setCreateExercise(true)
    }

    const openWorkoutForm = () => {
        setChosen(true)
        setCreateWorkout(true)
    }

    return (
        <div className={styles.container}>
            {!chosen && (
                <>
                    <button onClick={openExerciseForm}>Exercise</button>
                    <button onClick={openWorkoutForm}>Workout</button>
                </>
            )}
            {createExercise && (
                <ExerciseForm />
            )}
            {createWorkout && (
                <WorkoutForm />
            )}
        </div>
    )
}

export default Add;