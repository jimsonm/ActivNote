const SET_EXERCISES = 'exercises/SET_EXERCISES';
// const GET_EXERCISE = 'exercises/GET_EXERCISE';

const setExercises = (exercises) => ({
    type: SET_EXERCISES,
    payload: exercises
})

// const getExercise = (exercise) => ({
//     type: GET_EXERCISE,
//     payload: exercise
// })

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
        // console.log(exercise)
        return exercise
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

// export const editDog = (payload) => async (dispatch) => {
//     const dogId = payload.dogId;
//     const userId = payload.id;
//     const response = await fetch(`/api/dogs/${dogId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     if (response.ok) {
//         dispatch(getDogs(userId))
//     }

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
        default:
            return state;
    }
}