import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../css-modules/SingleExercise.module.css';
import { useParams } from 'react-router-dom';
import { editExercise, deleteExercise } from '../../../store/exercise';

function ExerciseDetails({ exercise, setCurrentExercise, setSelected, isForm, setIsForm }) {
    const currExId = exercise.id
    const currentExercise = useSelector(state => state.exercise[currExId])
    const exercises = useSelector(state => Object.values(state.exercise))
    console.log(exercises)
    console.log(currentExercise)
    const { userId } = useParams();
    const dispatch = useDispatch();
    // const [isForm, setIsForm] = useState(false)
    const exerciseId = currentExercise.id
    const [name, setName] = useState(currentExercise.exercise_name)
    const [calories, setCalories] = useState(currentExercise.calories_burned)
    const [notes, setNotes] = useState(currentExercise.notes)
    const [errors, setErrors] = useState([]);

    const updateExercise = async (e) => {
        e.preventDefault();
        if (!Number(calories) && calories !== 0) {
            setErrors(["Please input an integer for the calories burned/min."])
        } else {
            const payload = {
                userId,
                exerciseId,
                name,
                calories,
                notes
            }
            dispatch(editExercise(payload))
            setIsForm(false)
            setErrors([])
        }
    }

    const cancel = async (e) => {
        e.preventDefault();
        setIsForm(false)
        setName(currentExercise.exercise_name)
        setCalories(currentExercise.calories_burned)
        setNotes(currentExercise.notes)
        setErrors([])
    }

    const removeExercise = async (e) => {
        e.preventDefault()
        const payload = {
            userId,
            exerciseId
        }
        dispatch(deleteExercise(payload))
        setCurrentExercise(null)
        setSelected(false)
    }

    const editForm = async (e) => {
        e.preventDefault();
        setIsForm(true)
        setName(currentExercise.exercise_name)
        setCalories(currentExercise.calories_burned)
        setNotes(currentExercise.notes)
    }

    return (
        <div className={styles.SingleExerciseContainer}>
            {!isForm && (
                <div>
                    <div className={styles.title}>
                        <div/>
                        <div>
                            <button onClick={editForm} className={styles.button}>
                                Update
                            </button>
                            <button onClick={removeExercise} className={styles.button}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <div>
                            {currentExercise.exercise_name}
                        </div>
                    <div>
                        Calories burned/min
                        <br />
                        {currentExercise.calories_burned}
                    </div>
                    <div>
                        {currentExercise.notes}
                    </div>
                </div>
            )}
            {isForm && (
                <form>
                    <div className={styles.title}>
                        <div/>
                        <div>
                            <button onClick={updateExercise} className={styles.button}>
                                Save
                            </button>
                            <button onClick={cancel} className={styles.button}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        Calories burned/min
                        <br />
                        <input
                            type='text'
                            name='calories_burned'
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                    <div>
                        <input
                            type='text'
                            name='notes'
                            value={notes}
                            placeholder='Notes about your exercise'
                            onChange={(e) => setNotes(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </form>
            )}
        </div>
    )
}

export default ExerciseDetails;