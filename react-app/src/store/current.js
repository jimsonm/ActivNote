const SET_CURRENTWORKOUT = 'current/SET_CURRENTWORKOUT';

const setCurrentWorkout = (workoutId) => ({
    type: SET_CURRENTWORKOUT,
    payload: workoutId
})

export const getCurrentWorkout = (workoutId) => async (dispatch) => {
    dispatch(setCurrentWorkout(workoutId))
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_CURRENTWORKOUT:
            newState = { ...state }
            newState['currentWorkoutId'] = action.payload
            return newState;
        default:
            return state;
    }
}