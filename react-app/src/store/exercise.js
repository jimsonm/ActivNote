const SET_EXERCISES = 'exercises/SET_EXERCISES';

const setExercises = (exercises) => ({
    type: SET_EXERCISES,
    payload: exercises
})

export const getExercises = (userId) => async (dispatch) => {
    const response = await fetch(`/api/exercises`)
    if (response.ok) {
        const exercises = await response.json();
        await dispatch(setExercises(exercises));
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = { exercises: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_EXERCISES:
            newState = { ...state }
            action.payload.forEach((exercise) => {
                newState[exercise.id] = exercise;
            });
        default:
            return state;
    }
}