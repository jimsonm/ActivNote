const SET_WORKOUTS = 'workouts/SET_WORKOUTS';
const DELETE_WORKOUT = 'workouts/DELETE_WORKOUTS';

const setWorkouts = (workouts) => ({
    type: SET_WORKOUTS,
    payload: workouts
})

const deleteWork = (workout) => ({
    type: DELETE_WORKOUT,
    payload: workout
})

export const getWorkouts = (userId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/all/${userId}`)
    if (response.ok) {
        const workouts = await response.json();
        await dispatch(setWorkouts(workouts));
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getWorkoutById = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}`)
    if (response.ok) {
        const workout = await response.json()
        return workout
    }
}

export const editWorkout = (payload) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        dispatch(getWorkouts(payload.user_id))
    }
}

export const deleteWorkout = (payload) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${payload.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteWork(payload.id))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_WORKOUTS:
            newState = { ...state }
            action.payload.workouts.forEach((workout) => {
                newState[workout.id] = workout;
            })
            return newState;
        case DELETE_WORKOUT:
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
}