const SET_CURRENTWORKOUT = 'current/SET_CURRENTWORKOUT';
const SET_CURRENTEXERCISE = 'current/SET_CURRENTEXERCISE';
const SET_CURRENTACTIVITY = 'current/SET_CURRENTACTIVITY';
const SET_WORKOUTICONS = 'current/SET_WORKOUTICONS';
const SET_ACTIVITYICONS = 'current/SET_ACTIVITYICONS';

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

const setWorkoutIcons = (status) => ({
    type: SET_WORKOUTICONS,
    payload: status
})

// CONST setActivityIcons = (status) => ({

// })

export const getCurrentWorkout = (workoutId) => async (dispatch) => {
    dispatch(setCurrentWorkout(workoutId))
}

export const getCurrentExercise = (exerciseId) => async (dispatch) => {
    dispatch(setCurrentExercise(exerciseId))
}

export const getCurrentActivity = (activityId) => async (dispatch) => {
    dispatch(setCurrentActivity(activityId))
}

export const getWorkoutIcons = (status) => async (dispatch) => {
    dispatch(setWorkoutIcons(status))
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
        case SET_WORKOUTICONS:
            newState = { ...state }
            newState['workoutIcons'] = action.payload
            return newState;
        default:
            return state;
    }
}