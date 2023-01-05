import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {ModalInfoType} from './../../store/store';
import Uploady, { useItemProgressListener } from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import UploadPrewiev from  '@rpldy/upload-preview';
import { url } from 'inspector';

function NewTaskForm (props: {projectId: number}) {
    const dispatch = useDispatch()
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let [taskFile, setTaskFile] = useState()
    let [taskTitle, setTaskTitle] = useState('') 
    let [taskDescription, setTaskDescription] = useState('')
    let [taskPriority, setTaskPriority] = useState('')

    function Uploader() {
        const item = useItemProgressListener((item) => {});

        useEffect (() => {
            if (item.id) {
                console.log(item.id)
            }
        }, [item])

        return (
            <div className="new-task-form__item new-task-form__upload">
                <UploadButton>Загрузить файл</UploadButton>
                <div className="upload-image-container">
                    <UploadPrewiev/>
                </div>
            </div>
        )
    }

    // useEffect(() => {
    //     console.log(progressData)
    // }, [progressData])

    function addNewTask() {
        if (taskTitle != "" && taskPriority != "") {
            if (taskDescription != "") {
                dispatch({type: "add_task", project: props.projectId, description: taskDescription, title: taskTitle, priority: parseInt(taskPriority)})
            } else 
            if (taskDescription == "") {
                dispatch({type: "add_task", project: props.projectId, title: taskTitle, priority: parseInt(taskPriority)})
            }
            if (taskFile != undefined) {
                alert("File selected and uploaded")
            }
            dispatch({type: "toggle_new_task_window_status"})
        } else {
            alert("Неверно введены данные")
        }
    }

    return (
        <form className={"new-task-form " + (isWindowOpened.isNewTaskAdding ? "" : "inactive")}>
            <Uploady destination={{url: "http://localhost:3001/select"}}>
                <div className="new-task-form-block">
                    <input className="new-task-form__item" type="text" placeholder="Имя задачи (до 30 символов)" pattern="[A-Za-zА-Яа-яЁё\s]{1,30}" onChange={(element) => setTaskTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                    <input className="new-task-form__item" type="text" placeholder="Приоритет (от 1 до 3, где 1 - наибольший приоритет)" pattern="[1-3]" onChange={(element) => setTaskPriority((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                </div>
                <div className="new-task-form-block">
                    <textarea className="new-task-form__item new-task-form__textarea" maxLength={300}  placeholder="Описание задачи (до 300 символов)" onChange={(element) => setTaskDescription(element.target.value != '' ? element.target.value : "Описание не добавлено")}/>
                    <Uploader/>
                </div>
                <div className="new-task-form-block">
                    <button className='new-task-form__item submit_button' type="submit" onClick={() => {addNewTask()}}>Создать задачу</button>
                </div>
            </Uploady>
        </form> 
    )
}

export default NewTaskForm;