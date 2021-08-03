const SET_WORKOUTS = 'workouts/SET_WORKOUTS';

const setWorkouts = (workouts) => ({
    type: SET_WORKOUTS,
    payload: workouts
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
        default:
            return state;
    }
}