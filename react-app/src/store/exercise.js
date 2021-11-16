const SET_EXERCISES = 'exercises/SET_EXERCISES';
const DELETE_EXERCISE = 'exercises/DELETE_EXERCISE';
const CLEAR_EXERCISES = 'exercises/CLEAR_EXERCISES'

const setExercises = (exercises) => ({
    type: SET_EXERCISES,
    payload: exercises
})

const deleteEx = (exercise) => ({
    type: DELETE_EXERCISE,
    payload: exercise
})

const clearExe = () => ({
    type: CLEAR_EXERCISES
})

export const clearAllExercises = () => async (dispatch) => {
    dispatch(clearExe())
}

export const getExercises = (userId) => async (dispatch) => {
    const response = await fetch(`/api/exercises/all/${userId}`)
    if (response.ok) {
        const exercises = await response.json();
        await dispatch(setExercises(exercises));
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export const getExerciseById = (exerciseId) => async (dispatch) => {
    const response = await fetch(`/api/exercises/${exerciseId}`)
    if (response.ok) {
        const exercise = await response.json()
        return exercise;
    }
}

export const editExercise = (payload) => async (dispatch) => {
    const exerciseId = payload.exerciseId
    const userId = payload.userId
    const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        dispatch(getExercises(userId))
    }
}

export const deleteExercise = (payload) => async (dispatch) => {
    const exerciseId = payload.exerciseId
    const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteEx(exerciseId));
    }
}

export const addExercise = (payload) => async (dispatch) => {
    const response = await fetch('/api/exercises/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (response.ok) {
        const data = await response.json();
        const userId = data.user_id
        dispatch(getExercises(userId))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_EXERCISES:
            newState = { ...state }
            action.payload.exercises.forEach((exercise) => {
                newState[exercise.id] = exercise;
            });
            return newState;
        case DELETE_EXERCISE:
            newState = { ...state }
            delete newState[action.payload]
            return newState; 
        case CLEAR_EXERCISES:
            return {};
        default:
            return state;
    }
}