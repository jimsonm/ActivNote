import { Modal } from '../../../context/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addWorkout } from '../../../store/workout'
import styles from '../../../css-modules/AddWorkoutModal.module.css'
import AddActivityModal from './AddActivityModal'
import { getCurrentWorkout } from '../../../store/current'
import { getExercises } from '../../../store/exercise'

function AddWorkoutModal({ setShowAddWorkoutModal }) {
    const dispatch = useDispatch();
    const [workout_name, setWorkout_Name] = useState('')
    const user_id = useSelector(state => state.session.user.id)
    const [workoutMade, setWorkoutMade] = useState(false)
    const [appendActivities, setAppendActivities] = useState(false)
    const [newWorkoutId, setNewWorkoutId] = useState(null)
    const [showAddActivityModal, setShowAddActivityModal] = useState(false)
    const [didAdd, setDidAdd] = useState(false)

    const createWorkout = async (e) => {
        e.preventDefault();
        const payload = {
            workout_name,
            user_id,
            track_id: 1
        }
        const data = await dispatch(addWorkout(payload))
        setNewWorkoutId(data.id)
        setWorkoutMade(true)
    }

    const addExercises = (e) => {
        e.preventDefault()
        setAppendActivities(true)
        setShowAddActivityModal(true)
        // setShowAddWorkoutModal(false)
        dispatch(getCurrentWorkout(newWorkoutId))
        dispatch(getExercises(user_id))
        setDidAdd(true)
    }

    return (
        <Modal onClose={() => setShowAddWorkoutModal(false)}>
            <div className={styles.container}>
                {!workoutMade && (
                    <div className={styles.formDiv}>
                        <form className={styles.Form}>
                            <div className={styles.title}>
                                Create A New Workout
                            </div>
                            <input
                                type='text'
                                name='workout_name'
                                value={workout_name}
                                onChange={(e) => setWorkout_Name(e.target.value)}
                                placeholder='Workout Name'
                                className={styles.input}
                            />
                            <button onClick={createWorkout} className={styles.button}>Submit</button>
                            <button onClick={() => setShowAddWorkoutModal(false)} className={styles.button}>Cancel</button>
                        </form>
                    </div>
                )}
                {workoutMade && !didAdd && (
                    <div className={styles.successDiv}>
                        <div className={styles.text}>
                            You've successfully made a workout.
                        </div>
                        <div className={styles.text}>
                            Would you like to add exercises to your workout?
                        </div>
                        <div>
                            <button onClick={addExercises} className={styles.button2}>Add Exercises</button>
                            <button onClick={() => setShowAddWorkoutModal(false)} className={styles.button2}>Maybe Later</button>
                        </div>
                    </div>
                )}
                {workoutMade && didAdd && (
                    <div className={styles.successDiv}>
                        <div className={styles.text}>
                            You've successfully added an exercise to your workout.
                        </div>
                        <div className={styles.text}>
                            Would you like to add another exercise to your workout?
                        </div>
                        <div>
                            <button onClick={addExercises} className={styles.button2}>Add Another</button>
                            <button onClick={() => setShowAddWorkoutModal(false)} className={styles.button2}>No Thank You</button>
                        </div>
                    </div>
                )}
                {appendActivities && showAddActivityModal && (
                    <AddActivityModal setShowAddActivityModal={setShowAddActivityModal}/>
                )}
            </div>
        </Modal>
    )
}

export default AddWorkoutModal;