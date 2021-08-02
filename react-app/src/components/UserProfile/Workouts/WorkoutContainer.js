import NavBar from "../Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getWorkouts } from '../../../store/workout'
// import { getActivities } from "../../../store/activity";

function WorkoutContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const workouts = useSelector(state => Object.values(state.workout))
    const activities = useSelector(state => Object.values(state.activity))
    console.log(workouts)   

    useEffect(() => {
        dispatch(getWorkouts(userId))
        // dispatch(getActivities())
    }, [dispatch, userId])

    return (
        <div>
            <NavBar />
            <div>
                {workouts.map((workout) => (
                    <div key={workout.id}>
                        {workout.workout_name}
                        </div>
                ))}
                {activities.map((activity) => (
                    <div key={activity.id}>
                        {activity.exercise_id}
                        </div>
                ))}
            </div>
        </div>
    )
}

export default WorkoutContainer;