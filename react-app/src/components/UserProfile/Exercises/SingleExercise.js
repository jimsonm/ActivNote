import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../css-modules/SingleExercise.module.css';

function ExerciseDetails({ exercise }) {
    const currentExercise = useSelector(state => Object.values(state.exercise)[exercise.id - 1])
    // console.log(currentExercise)
    const dispatch = useDispatch();
    const [isForm, setIsForm] = useState(false)
    const [name, setName] = useState(currentExercise.exercise_name)
    const [calories, setCalories] = useState(currentExercise.calories_burned)
    const [notes, setNotes] = useState(currentExercise.notes)
    // console.log(exercise)
    return (
        <div>
            {!isForm && (
                <div>
                    <div className={styles.alignRight}>
                        <button onClick={() => setIsForm(true)}>
                            Update
                        </button>
                        <button>
                            Delete
                        </button>
                    </div>
                    <div>
                        {name}
                    </div>
                    <div>
                        Calories burned/min
                        <br />
                        {calories}
                    </div>
                    <div>
                        {notes}
                    </div>
                </div>
            )}
            {isForm && (
                <form>
                    <div className={styles.alignRight}>
                        <button onClick={() => setIsForm(false)}>
                            {/* make button submit */}
                            Save
                        </button>
                        <button onClick={() => setIsForm(false)}>
                            Cancel
                        </button>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        />
                        {/* Calories burned/min: {currentExercise.calories_burned} */}
                    </div>
                    <div>
                        <input
                            type='text'
                            name='notes'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        {/* Notes: {currentExercise.notes} */}
                    </div>
                </form>
            )}
        </div>
    )
}

export default ExerciseDetails;