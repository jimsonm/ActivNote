const SET_CURRENTWORKOUT = 'current/SET_CURRENTWORKOUT';
const SET_CURRENTEXERCISE = 'current/SET_CURRENTEXERCISE';
const SET_CURRENTACTIVITY = 'current/SET_CURRENTACTIVITY';
const SET_REDIRECTED = 'current/SET_REDIRECTED';
const CLEAR_CURRENT = 'current/CLEAR_CURRENT';

const setCurrentWorkout = (workoutId) => ({
    type: SET_CURRENTWORKOUT,
    payload: workoutId
})

const setCurrentExercise = (exerciseId) => ({
    type: SET_CURRENTEXERCISE,
    payload: exerciseId
})

const setCurrentActivity = (activityId) => ({
    type: SET_CURRENTACTIVITY,
    payload: activityId
})

const setRedirected = (payload) => ({
    type: SET_REDIRECTED,
    payload
})

const clearCurr = () => ({
    type: CLEAR_CURRENT
})

export const clearCurrentValues = () => async (dispatch) => {
    dispatch(clearCurr())
}

export const getCurrentWorkout = (workoutId) => async (dispatch) => {
    dispatch(setCurrentWorkout(workoutId))
}

export const getCurrentExercise = (exerciseId) => async (dispatch) => {
    dispatch(setCurrentExercise(exerciseId))
}

export const getCurrentActivity = (activityId) => async (dispatch) => {
    dispatch(setCurrentActivity(activityId))
}

export const redirected = (payload) => async (dispatch) => {
    dispatch(setRedirected(payload))
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
        case SET_CURRENTACTIVITY:
            newState = { ...state }
            newState['currentActivityId'] = action.payload
            return newState;
        case SET_REDIRECTED:
            newState = { ...state }
            newState['isRedirected'] = action.payload.status
            newState['redirectedExerciseId'] = action.payload.exerciseId
            return newState;
        case CLEAR_CURRENT:
            return {};
        default:
            return state;
    }
}