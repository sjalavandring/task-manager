import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {ModalInfoType} from './../../store/store';

type NewSubaskFormProps = {
    modalWindowsReducer: ModalInfoType
}

// currentStatus: number, currentTaskId: number, projectId: number

function NewSubtaskForm (props: {currentStatus: number, currentTaskId: number, projectId: number, closeSubtasskform: any}) {
    const dispatch = useDispatch()
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let newSubtaskInfo = structuredClone(useSelector((state: any) => state.changeNewSubtaskInfo))
    function closeSubtasskform () {
        props.closeSubtasskform()
    }

    let [taskTitle, setTaskTitle] = useState('') 
    let [taskDescription, setTaskDescription] = useState('')
    let [taskPriority, setTaskPriority] = useState('')

    function addNewSubtask() {
        if (taskTitle != "" && taskPriority != "") {
            if (taskDescription != "") {
                dispatch({type: "add_subtask", project: props.projectId, description: taskDescription, title: taskTitle, priority: parseInt(taskPriority), taskStatus: props.currentStatus, taskId: props.currentTaskId})
            } else 
            if (taskDescription == "") {
                dispatch({type: "add_subtask", project: props.projectId, title: taskTitle, priority: parseInt(taskPriority), taskStatus: props.currentStatus, taskId: props.currentTaskId})
            }
            closeSubtasskform()
            dispatch({type: "toggle_new_subtask_window_status"})
        } else {
            alert("Неверно введены данные")
        }
    }

    return (
        <form className={"new-task-form " + (isWindowOpened.isNewSubtaskAdding ? "" : "inactive")}>
            <div className="new-task-form-block">
                <input className="new-task-form__item" type="text" placeholder="Имя подзадачи (до 30 символов)" pattern="[A-Za-zА-Яа-яЁё\s]{1,30}" onChange={(element) => setTaskTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                <input className="new-task-form__item" type="text" placeholder="Приоритет (от 1 до 3, где 1 - наибольший приоритет)" pattern="[1-3]" onChange={(element) => setTaskPriority((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
            </div>
            <div className="new-task-form-block">
                <textarea className="new-task-form__item new-task-form__textarea" maxLength={300}  placeholder="Описание подзадачи (до 300 символов)" onChange={(element) => setTaskDescription(element.target.value != '' ? element.target.value : "Описание не добавлено")}/>
            </div>
            <div className="new-task-form-block">
                <button className='new-task-form__item submit_button' type="submit" onClick={() => {addNewSubtask()}}>Создать подзадачу</button>
            </div>  
        </form> 
    )
}

export default NewSubtaskForm;