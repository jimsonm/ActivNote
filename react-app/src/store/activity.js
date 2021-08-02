const SET_ACTIVITES = 'activities/SET_ACTIVITIES';

const setActivities = (activities) => ({
    type: SET_ACTIVITES,
    payload: activities
})

export const getActivities = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/activities/all/${workoutId}`)
    console.log(response)
    if (response.ok) {
        const activities = await response.json();
        await dispatch(setActivities(activities));
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ACTIVITES:
            newState = { ...state }
            action.payload.activities.forEach((activity) => {
                newState[activity.id] = activity;
            })
            return newState;
        default:
            return state;
    }
}