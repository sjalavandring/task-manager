import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {ModalInfoType} from './../../store/store';

function NewProjectForm () {
    const dispatch = useDispatch()
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let [projectTitle, setProjeactTitle] = useState('') 

    function addNewTask() {
        if (projectTitle != "") {
            dispatch({type: "add_new_project", projectTitle: projectTitle})
            dispatch({type: "toggle_new_project_window_status"})
        } else {
            alert("Неверно введены данные")
        }
    }

    return (
        <form className={"new-task-form new-project-form" + (isWindowOpened.isNewProjectAdding ? "" : "inactive")}>
            <div className="new-task-form-block">
                <input className="new-task-form__item" type="text" placeholder="Название проекта (до 30 символов)" pattern="[A-Za-zА-Яа-яЁё\s]{1,30}" onChange={(element) => setProjeactTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
            </div>
            <div className="new-task-form-block">
                <button className='new-task-form__item submit_button' type="submit" onClick={() => {addNewTask()}}>Создать новый проект</button>
            </div>  
        </form> 
    )
}

export default NewProjectForm;