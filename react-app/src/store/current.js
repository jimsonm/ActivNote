const SET_CURRENTWORKOUT = 'current/SET_CURRENTWORKOUT';
const SET_CURRENTEXERCISE = 'current/SET_CURRENTEXERCISE';

const setCurrentWorkout = (workoutId) => ({
    type: SET_CURRENTWORKOUT,
    payload: workoutId
})

const setCurrentExercise = (exerciseId) => ({
    type: SET_CURRENTEXERCISE,
    payload: exerciseId
})

export const getCurrentWorkout = (workoutId) => async (dispatch) => {
    dispatch(setCurrentWorkout(workoutId))
}

export const getCurrentExercise = (exerciseId) => async (dispatch) => {
    dispatch(setCurrentExercise(exerciseId))
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_CURRENTWORKOUT:
            newState = { ...state }
            newState['currentWorkoutId'] = action.payload
            return newState;
        case SET_CURRENTEXERCISE:
            newState = { ...state }
            newState['currentExerciseId'] = action.payload
            return newState;
        default:
            return state;
    }
}