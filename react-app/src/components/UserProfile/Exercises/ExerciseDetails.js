import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../css-modules/SingleExercise.module.css';
import { useParams } from 'react-router-dom';
import { editExercise, deleteExercise } from '../../../store/exercise';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import { FaBlackberry } from 'react-icons/fa';

function ExerciseDetails({ exercise, setCurrentExercise, setSelected, isForm, setIsForm, editorState, setEditorState }) {
    const currExId = exercise.id
    const currentExercise = useSelector(state => state.exercise[currExId])
    const { userId } = useParams();
    const dispatch = useDispatch();
    const exerciseId = currentExercise.id
    const [name, setName] = useState(currentExercise.exercise_name)
    const [calories, setCalories] = useState(currentExercise.calories_burned)
    // const [notes, setNotes] = useState(currentExercise.notes)
    const [errors, setErrors] = useState([]);
    // const [editorState, setEditorState] = useState(() =>
    //     EditorState.createWithContent(convertFromRaw(JSON.parse(currentExercise.notes)))
    // );
    console.log(editorState)
    const zzzz = '<p>kdosakdakfsdfsf<span style="font-size: 72px;">fdfd</span></p>'

    const updateRichText = async (state) => {
        await setEditorState(state);
        const data = convertToRaw(editorState.getCurrentContent());
        console.log(data);
    };

    const updateExercise = async (e) => {
        e.preventDefault();
        // console.log(convertToRaw(editorState.getCurrentContent()));
        const data = convertToRaw(editorState.getCurrentContent());
        const data2 = draftToHtml(data);
        console.log(data2);
        if (!Number(calories) && calories !== 0) {
            setErrors(["Please input an integer for the calories burned/min."])
        } else {
            const payload = {
                userId,
                exerciseId,
                name,
                calories,
                notes: JSON.stringify(data)
            }
            dispatch(editExercise(payload))
            setIsForm(false)
            setErrors([])
        }
    }

    const cancel = async (e) => {
        e.preventDefault();
        setIsForm(false)
        setName(currentExercise.exercise_name)
        setCalories(currentExercise.calories_burned)
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(currentExercise.notes))));
        setErrors([])
    }

    const removeExercise = async (e) => {
        e.preventDefault()
        const payload = {
            userId,
            exerciseId
        }
        dispatch(deleteExercise(payload))
        setCurrentExercise(null)
        setSelected(false)
    }

    const editForm = async (e) => {
        e.preventDefault();
        setIsForm(true)
        setName(currentExercise.exercise_name)
        setCalories(currentExercise.calories_burned)
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(currentExercise.notes))));
    }

    return (
        <div className={styles.SingleExerciseContainer}>
            {!isForm && (
                <div>
                    <div className={styles.title}>
                        <div />
                        <div>
                            <button onClick={editForm} className={styles.button}>
                                Update
                            </button>
                            <button onClick={removeExercise} className={styles.button}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className={styles.Name}>
                        {currentExercise.exercise_name}
                    </div>
                    <div className={styles.Calories}>
                        <div className={styles.CaloriesTitle}>
                            Calories burned/min
                        </div>
                        <div className={styles.CaloriesInfo}>
                            {currentExercise.calories_burned}
                        </div>
                    </div>
                    <div className={styles.Notes}>
                        <div className={styles.NotesTitle}>
                            Notes
                        </div>
                        <div className={styles.NotesInfo}>
                            {/* {parse(zzzz)} */}
                            {parse(draftToHtml(JSON.parse(currentExercise.notes)))}
                            {console.log(currentExercise.notes)}
                            {/* <Editor
                                editorState={editorState}
                                // toolbarClassName="toolbarClassName"
                                // wrapperClassName="wrapperClassName"
                                // editorClassName="editorClassName"
                                // onEditorStateChange={updateRichText}
                                readOnly={true}
                                toolbarHidden={true}
                                className={styles.NotesInfo}
                            /> */}
                            {/* {JSON.parse(currentExercise.notes).blocks[0].text} */}
                            {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
                        </div>
                    </div>
                </div>
            )}
            {isForm && (
                <form>
                    <div className={styles.title}>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div>
                            <button onClick={updateExercise} className={styles.button}>
                                Save
                            </button>
                            <button onClick={cancel} className={styles.button}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className={styles.Name}>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input1}
                        />
                    </div>
                    <div>
                        <div className={styles.CaloriesTitle}>
                            Calories burned/min
                        </div>
                        <input
                            type='text'
                            name='calories_burned'
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className={styles.input2}
                        />
                    </div>
                    <div>
                        <div className={styles.NotesTitle}>
                            Notes
                        </div>
                        {/* <textarea
                            type='text'
                            name='notes'
                            value={notes}
                            placeholder='Notes about your exercise'
                            onChange={(e) => setNotes(e.target.value)}
                            className={styles.input3}
                        /> */}
                        <span>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={updateRichText}
                            />
                        </span>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ExerciseDetails;