import { useState } from 'react';
import styles from '../../../../css-modules/AddExercise.module.css'
import { useParams, useHistory } from 'react-router-dom'
import { addExercise } from '../../../../store/exercise'
import { useDispatch } from 'react-redux'

function ExerciseForm({setShowModal}) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [exercise_name, setExercise_name] = useState('');
    const [calories_burned, setCalories_burned] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const createExercise = async (e) => {
        e.preventDefault();
        if (calories_burned === '') {
            const payload = {
                exercise_name,
                calories_burned: 0,
                notes,
                user_id: userId
            }
            await dispatch(addExercise(payload))
        }
        else if (!Number(calories_burned)) {
            setErrors(["Please only use integers for the calories burned per minute."])
        } else {
            const payload = {
                exercise_name,
                calories_burned,
                notes,
                user_id: userId
            }
            const data = await dispatch(addExercise(payload))
            console.log(data)
            const id = data.id
            if (id) {
                history.push(`/user/${userId}/exercises`)
            }
            setShowModal(false)
        }
    }

    const updateExerciseName = (e) => {
        setExercise_name(e.target.value)
    }

    const updateCalories = (e) => {
        setCalories_burned(e.target.value)
    }

    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    return (
        <div className={styles.container}>
            Create A New Exercise
            <form onSubmit={createExercise} className={styles.Form}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input
                    name='exercise_name'
                    type='text'
                    placeholder='Exercise Name'
                    value={exercise_name}
                    required={true}
                    onChange={updateExerciseName}
                />
                <input
                    name='calories_burned'
                    type='text'
                    placeholder='Calories burned per minute, if left blank a default value of 0 will be used.'
                    value={calories_burned}
                    onChange={updateCalories}
                />
                <textarea
                    name='notes'
                    type='text'
                    placeholder='Any thoughts you might have regarding this exercise. This can include goals or things to remember.'
                    value={notes}
                    onChange={updateNotes}
                />
                <button type='submit'>Submit</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default ExerciseForm;