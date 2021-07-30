import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../css-modules/SingleExercise.module.css';
import { useParams } from 'react-router-dom';
import { editExercise, deleteExercise } from '../../../store/exercise';

function ExerciseDetails({ exercise }) {
    const currentExercise = useSelector(state => Object.values(state.exercise)[exercise.id - 1])
    // console.log(currentExercise)
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [isForm, setIsForm] = useState(false)
    const exerciseId = currentExercise.id
    const [name, setName] = useState(currentExercise.exercise_name)
    const [calories, setCalories] = useState(currentExercise.calories_burned)
    const [notes, setNotes] = useState(currentExercise.notes)
    const [errors, setErrors] = useState([]);
    // console.log(exercise)
    const updateExercise = async (e) => {
        e.preventDefault();
        if (!Number(calories)) {
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
    }

    return (
        <div>
            {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            {!isForm && (
                <div>
                    <div className={styles.alignRight}>
                        <button onClick={() => setIsForm(true)}>
                            Update
                        </button>
                        <button onClick={removeExercise}>
                            Delete
                        </button>
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
                    <div className={styles.alignRight}>
                        <button onClick={updateExercise}>
                            {/* make button submit */}
                            Save
                        </button>
                        <button onClick={cancel}>
                            Cancel
                        </button>
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
                    <div>
                        <input
                            type='text'
                            name='notes'
                            value={notes}
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