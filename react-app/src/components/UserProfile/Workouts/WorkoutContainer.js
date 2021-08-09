import NavBar from "../Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkouts } from '../../../store/workout'
import styles from '../../../css-modules/WorkoutContainer.module.css'
import IndividualWorkout from "./IndividualWorkout";
import AddWorkoutModal from "./AddWorkoutModal";
import { clearCurrentValues } from '../../../store/current'

function WorkoutContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const workouts = useSelector(state => Object.values(state.workout))
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false)

    useEffect(() => {
        dispatch(getWorkouts(userId))
        return function cleanup() {
            dispatch(clearCurrentValues());
        }
    }, [dispatch, userId])

    return (
        <div className={styles.WorkoutContainer}>
            <NavBar />
            <div className={styles.InnerWorkoutContainer}>
                <div className={styles.WorkoutNameContainer}>
                    <div className={styles.title}>
                        <div>
                            Workouts
                        </div>
                        <button className={styles.button} onClick={() => setShowAddWorkoutModal(true)}>
                            Add Workout
                        </button>
                        {showAddWorkoutModal && (
                            <AddWorkoutModal setShowAddWorkoutModal={setShowAddWorkoutModal}/>
                        )}
                    </div>
                    <div className={styles.individualWorkoutContainer}>
                        {workouts.length === 0 && (
                            <div className={styles.noWorkouts}>
                                You currently have no workouts. Try creating one to start your fitness journey!
                            </div>
                        )}
                        {workouts.map((workout) => (
                            <IndividualWorkout workout={workout} key={workout.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutContainer;