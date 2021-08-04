import { Modal } from '../../../context/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import styles from '../../../css-modules/AddActivityModal.module.css'
import { addActivity } from '../../../store/activity'

function AddActivityModal({ setShowAddActivityModal }) {
    const dispatch = useDispatch();
    const exercises = useSelector(state => Object.values(state.exercise));
    const workoutId = useSelector(state => state.current.currentWorkoutId)
    const [selectExercise, setSelectExercise] = useState(false);
    const [sets, setSets] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [duration, setDuration] = useState('');
    const [errors, setErrors] = useState('');

    const save = async (e, exerciseId) => {
        e.preventDefault();
        console.log(workoutId)
        console.log(selectExercise.id)
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

    return (
        <Modal onClose={() => setShowAddActivityModal(false)}>
            <>
                {!selectExercise && (
                    <div>
                        Select An Exercise
                        {exercises.map((exercise) => (
                            <div onClick={() => setSelectExercise(exercise)} key={exercise.id}>
                                {exercise.exercise_name}
                            </div>
                        ))}
                    </div>
                )}
                {selectExercise && (
                    <div>
                        {selectExercise.exercise_name}
                        <form>
                            {errors && (
                                <div>
                                    {errors}
                                </div>
                            )}
                            <div>
                                {`Sets: `}
                                <input
                                    type='text'
                                    name='sets'
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                    placeholder='Sets'
                                />
                            </div>
                            <div>
                                {`Reps: `}
                                <input
                                    type='text'
                                    name='repetitions'
                                    value={repetitions}
                                    onChange={(e) => setRepetitions(e.target.value)}
                                    placeholder='Repetitions'
                                />
                            </div>
                            <div>
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
                )}
            </>
        </Modal>
    )
}

export default AddActivityModal;