import { Modal } from '../../../context/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import styles from '../../../css-modules/AddActivityModal.module.css'
import { addActivity } from '../../../store/activity'
import { IoReturnUpBackSharp } from "react-icons/io5";
import { getCurrentActivity, getCurrentWorkout } from '../../../store/current'

function AddActivityModal({ setShowAddActivityModal }) {
    const dispatch = useDispatch();
    const exercises = useSelector(state => Object.values(state.exercise));
    const workoutId = useSelector(state => state.current.currentWorkoutId)
    const [selectExercise, setSelectExercise] = useState(false);
    const [sets, setSets] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [duration, setDuration] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        return function cleanup() {
            dispatch(getCurrentActivity(0))
            dispatch(getCurrentWorkout(0))
        }
    }, [dispatch])

    const save = async (e, exerciseId) => {
        e.preventDefault();
        if (!Number(sets) || !Number(repetitions) || !Number(duration)) {
            setErrors('Please make sure all inputs are integer values.')
        } else {
            const payload = {
                'workout_id': workoutId,
                exercise_id: selectExercise.id,
                sets,
                repetitions,
                duration
            }
            await dispatch(addActivity(payload))
            await setErrors('')
            await setShowAddActivityModal(false)
        }
    }

    const cancel = () => {
        setShowAddActivityModal(false)
    }

    const back = () => {
        setSelectExercise(false)
    }

    return (
        <Modal onClose={() => setShowAddActivityModal(false)}>
            <div className={styles.container}>
                {!selectExercise && (
                    <div>
                        Select An Exercise
                        <div className={styles.exerciseList}>
                            {exercises.map((exercise) => (
                                <div onClick={() => setSelectExercise(exercise)} key={exercise.id} className={styles.indivExercise}>
                                    {exercise.exercise_name}
                                </div>
                            ))}
                        </div>
                        <button onClick={cancel} className={styles.button}>
                            Cancel
                        </button>
                    </div>
                )}
                {selectExercise && (
                    <div className={styles.activityDetails}>
                        <div className={styles.back}>
                            <IoReturnUpBackSharp onClick={back} className={styles.icon} />
                        </div>
                        <div>
                            <div>
                                {selectExercise.exercise_name}
                            </div>
                            <form>
                                {errors && (
                                    <div>
                                        {errors}
                                    </div>
                                )}
                                <div className={styles.inputDivs}>
                                    {`Sets: `}
                                    <input
                                        type='text'
                                        name='sets'
                                        value={sets}
                                        onChange={(e) => setSets(e.target.value)}
                                        placeholder='Sets'
                                    />
                                </div>
                                <div className={styles.inputDivs}>
                                    {`Reps: `}
                                    <input
                                        type='text'
                                        name='repetitions'
                                        value={repetitions}
                                        onChange={(e) => setRepetitions(e.target.value)}
                                        placeholder='Repetitions'
                                    />
                                </div>
                                <div className={styles.inputDivs}>
                                    {`Duration: `}
                                    <input
                                        type='text'
                                        name='duration'
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder='Duration in minutes'
                                    />
                                </div>
                                <div>
                                    <button onClick={(e) => save(e, selectExercise.id)} className={styles.button}>
                                        Save
                                    </button>
                                    <button onClick={cancel} className={styles.button}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default AddActivityModal;