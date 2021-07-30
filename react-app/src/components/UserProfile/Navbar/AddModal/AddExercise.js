import { useState } from 'react';

function ExerciseForm() {
    const [exercise_name, setExercise_name] = useState('');
    const [calories_burned, setCalories_burned] = useState('');
    const [notes, setNotes] = useState('');

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
        <div>
            heres the exercise form!
            <form>
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
                    placeholder='Calories burned per minute'
                    value={calories_burned}
                    onChange={updateCalories}
                />
                <input
                    name='notes'
                    type='text'
                    placeholder='Any thoughts you might have regarding this exercise. This can include goals and things to remember.'
                    value={notes}
                    onChange={updateNotes}
                />
            </form>
        </div>
    )
}

export default ExerciseForm;