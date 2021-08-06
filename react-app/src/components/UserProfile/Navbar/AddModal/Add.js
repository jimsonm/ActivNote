import { useState } from 'react';
import styles from '../../../../css-modules/AddModal.module.css'
import ExerciseForm from './AddExercise';
import WorkoutForm from './AddWorkout';
import AddWorkoutModal from '../../Workouts/AddWorkoutModal';

function Add({setShowModal}) {
    const [createExercise, setCreateExercise] = useState(false);
    const [createWorkout, setCreateWorkout] = useState(false);
    const [chosen, setChosen] = useState(false);
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);

    const openExerciseForm = () => {
        setChosen(true)
        setCreateExercise(true)
    }

    const openWorkoutForm = () => {
        setChosen(true)
        setShowAddWorkoutModal(true)
    }

    return (
        <div className={styles.container}>
            {!chosen && (
                <>
                    <button onClick={openExerciseForm} className={styles.button}>Exercise</button>
                    <button onClick={openWorkoutForm} className={styles.button}>Workout</button>
                </>
            )}
            {createExercise && (
                <ExerciseForm setShowModal={setShowModal} setChosen={setChosen} setCreateExercise={setCreateExercise}/>
            )}
            {showAddWorkoutModal && (
                <AddWorkoutModal setShowAddWorkoutModal={setShowModal}/>
            )}
        </div>
    )
}

export default Add;