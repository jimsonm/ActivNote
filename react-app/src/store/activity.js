const SET_ACTIVITES = 'activities/SET_ACTIVITIES';
const DELETE_ACTIVITY = 'activities/DELETE_ACTIVITY';
const CLEAR_ACTIVITY = 'activities/CLEAR_ACTIVITY'

const setActivities = (activities) => ({
    type: SET_ACTIVITES,
    payload: activities
})

const deleteAct = (activity) => ({
    type: DELETE_ACTIVITY,
    payload: activity
})

const clearAct = () => ({
    type: CLEAR_ACTIVITY
})

export const clearAllActivities = () => async (dispatch) => {
    dispatch(clearAct())
}

export const getActivities = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/activities/all/${workoutId}`)
    if (response.ok) {
        const activities = await response.json();
        await dispatch(setActivities(activities));
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editActivity = (payload) => async (dispatch) => {
    const activityId = payload.activityId
    const workoutId = payload.workoutId
    const response = await fetch(`/api/activities/${activityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        dispatch(getActivities(workoutId))
    }
}

export const deleteActivity = (payload) => async (dispatch) => {
    const activityId = payload.activityId
    const response = await fetch(`/api/activities/${activityId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteAct(activityId))
    }
}

export const addActivity = (payload) => async (dispatch) => {
    const response = await fetch('/api/activities/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getActivities(payload.workout_id))
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
        case SET_ACTIVITES:
            newState = {}    
            action.payload.activities.forEach((activity) => {
                newState[activity.id] = activity;
            })
            return newState;
        case DELETE_ACTIVITY:
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        case CLEAR_ACTIVITY:
            return {};
        default:
            return state;
    }
}