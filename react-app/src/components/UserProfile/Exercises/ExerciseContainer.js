import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExercises, getExerciseById } from '../../../store/exercise';
import ExerciseDetails from './ExerciseDetails';
import styles from '../../../css-modules/ExerciseContainer.module.css';
import NavBar from '../Navbar';
import { redirected } from '../../../store/current';
import { EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';

function ExerciseContainer() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [currentExercise, setCurrentExercise] = useState(null);
    const exercises = useSelector(state => Object.values(state.exercise))
    const isRedirected = useSelector(state => state.current.isRedirected)
    const redirectedExercise = useSelector(state => state.current.redirectedExerciseId)
    const [selected, setSelected] = useState(false)
    const [isForm, setIsForm] = useState(false)
    const [editorState, setEditorState] = useState();

    useEffect(() => {
        dispatch(getExercises(userId))
    }, [dispatch, userId])

    useEffect(() => {
        if (currentExercise) {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(currentExercise.notes))));
        }
    }, [currentExercise])

    const displayDetails = async (id) => {
        const exercise = await dispatch(getExerciseById(id))
        setCurrentExercise(exercise)
        setSelected(true)
        setIsForm(false)
        if (isRedirected) {
            const payload = {
                status: false,
                exerciseId: redirectedExercise
            }
            dispatch(redirected(payload))
        }
    }

    if (isRedirected) {
        displayDetails(redirectedExercise)
    }

    return (
        <div className={styles.ExerciseContainer}>
            <NavBar />
            <div className={styles.InnerExerciseContainer}>
                <div className={styles.ExerciseNameContainer}>
                    <div className={styles.title}>
                        Exercises
                    </div>
                    <div>
                        <div className={styles.individualExerciseContainer}>
                            {exercises.map((exercise) => (
                                <div onClick={() => displayDetails(exercise.id)} key={exercise.id} className={styles.exerciseNames}>
                                    <div className={styles.exerciseTitle}>
                                        {exercise.exercise_name}
                                    </div>
                                    <div className={styles.exerciseNotes}>
                                        {parse(draftToHtml(JSON.parse(exercise.notes)))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.ExerciseDetails}>
                    {exercises.length === 0 && (
                        <div className={styles.pleaseSelect}>
                            You currently have no exercises. Try creating one to start your fitness journey!
                        </div>
                    )}
                    {!selected && exercises.length !== 0 && (
                        <div className={styles.pleaseSelect}>
                            Please select an exercise to view its details.
                        </div>
                    )}
                    {currentExercise && selected && (
                        <ExerciseDetails exercise={currentExercise} setCurrentExercise={setCurrentExercise} setSelected={setSelected} isForm={isForm} setIsForm={setIsForm} editorState={editorState} setEditorState={setEditorState} />
                    )}
                </div>
            </div>
        </div>
    )

}

export default ExerciseContainer;