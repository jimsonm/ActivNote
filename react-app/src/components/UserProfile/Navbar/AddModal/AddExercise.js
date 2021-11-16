import { useState } from 'react';
import styles from '../../../../css-modules/AddExercise.module.css'
import { useParams, useHistory } from 'react-router-dom'
import { addExercise } from '../../../../store/exercise'
import { useDispatch } from 'react-redux'
import { IoReturnUpBackSharp } from "react-icons/io5";

function ExerciseForm({setShowModal, setChosen, setCreateExercise}) {
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
                'notes': `{"blocks":[{"key":"t76n","text":"${notes}","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
                user_id: userId
            }
            await dispatch(addExercise(payload))
            setShowModal(false)
        }
        else if (!Number(calories_burned)) {
            setErrors(["Please only use integers for the calories burned per minute."])
        } else {
            const payload = {
                exercise_name,
                calories_burned,
                'notes': `{"blocks":[{"key":"t76n","text":"${notes}","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
                user_id: userId
            }
            const data = await dispatch(addExercise(payload))
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

    const close = () => {
        setShowModal(false)
    }

    const back = () => {
        setChosen(false)
        setCreateExercise(false)
    }
    return (
        <div className={styles.container}>
            <IoReturnUpBackSharp onClick={back} className={styles.icon}/>  
            <br />
            Create A New Exercise
            <form onSubmit={createExercise} className={styles.Form}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind} className={styles.errors}>{error}</div>
                    ))}
                </div>
                <input
                    name='exercise_name'
                    type='text'
                    placeholder='Exercise Name'
                    value={exercise_name}
                    required={true}
                    onChange={updateExerciseName}
                    className={styles.input1}
                />
                <textarea
                    name='calories_burned'
                    type='text'
                    placeholder='Calories burned per minute, if left blank a default value of 0 will be used.'
                    value={calories_burned}
                    onChange={updateCalories}
                    className={styles.input2}
                    rows={2}
                />
                <textarea
                    name='notes'
                    rows={2}
                    type='text'
                    placeholder='Any thoughts you might have regarding this exercise. This can include goals or feelings about the exercise.'
                    value={notes}
                    onChange={updateNotes}
                    className={styles.input3}
                />
                <button type='submit' className={styles.button}>Submit</button>
                <button onClick={close} className={styles.button}>Cancel</button>
            </form>
        </div>
    )
}

export default ExerciseForm;