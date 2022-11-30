import React, { useState, useEffect } from 'react'
import warningImg from  '../../img/warning.jpg'
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {taskListType} from './../../store/store';


function TaskManager () {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: taskListType[]) => state)
    let [isTaskAdding, setTaskAdding] = useState<boolean>(false)
    
    let taskList = taskListInfo.map((column) => {
        return (
            <div className="tasks-column" >
                <div className="tasks-list" >
                    
                        <div draggable="true" className={"task-list-title " + `column-${column.status}` }>{column.status}</div>
                        <div className='task-box'>  
                            {column.tasks.map((task) => {
                                return (
                                    <>
                                        <div className="task task-container" key={task.id}>
                                            <div className="task-row">
                                                <div className="task-row__item">{task.id}</div>
                                                <div className="task-row__item">{task.title}</div>
                                                <div className="task-row__item">{task.dateOfCreate}</div>
                                            </div>
                                        </div>
                                        {task.subtasks != undefined ? task.subtasks.map((subtask) => {
                                            return (
                                                <div className="subtask" key={subtask.id}>
                                                    <div className="task-row">
                                                        <img src="warningImg" alt="task-priority" />
                                                        <div className="task-row__item">{task.id + "." + subtask.id}</div>
                                                        <div className="task-row__item">{subtask.title}</div>
                                                        <div className="task-row__item">{subtask.dateOfCreate}</div>
                                                    </div>
                                                </div>
                                            )                                  
                                        }) : ""}
                                    </>
                                )
                            })}
                    </div>
                </div>
            </div>
        )
    })

    function Taskform () {
        let [taskTitle, setTaskTitle] = useState('') 
        let [taskDescription, setTaskDescription] = useState('')
        let [taskPriority, setTaskPriority] = useState('')

        function addNewTask() {
            if (taskTitle != "" && taskPriority != "") {
                if (taskDescription != "") {
                    dispatch({type: "add_task", description: 'testdesc', title: "testtitle", priority: 2})
                } else 
                if (taskDescription == "") {
                    dispatch({type: "add_task", title: "testtitle", priority: 2})
                }
                alert ("Задача успешно добавлена")
            } else {
                alert("Неверно введены данные")
            }
        }

        return (
            <form className={"new-task-form " + (isTaskAdding ? "" : "inactive")}>
                <div className="new-task-form-block">
                    <input className="new-task-form__item" type="text" placeholder="Имя задачи (до 10 символов)" pattern="[A-Za-zА-Яа-яЁё]{1,10}" onChange={(element) => setTaskTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                    <input className="new-task-form__item" type="text" placeholder="Приоритет (от 1 до 3, где 1 - наибольший приоритет)" pattern="[1-3]" onChange={(element) => setTaskPriority((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                </div>
                <div className="new-task-form-block">
                    <input className="new-task-form__item new-task-form_textarea" type="textarea" placeholder="Имя задачи (до 100 символов)" pattern="[A-Za-zА-Яа-яЁё]{,100}" onChange={(element) => setTaskDescription((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')}/>
                </div>
                <div className="new-task-form-block">
                    <button className='new-task-form__item submit_button' type="submit" onClick={() => {addNewTask()}}>Создать задачу</button>
                </div>  
            </form> 
        )
    }

    return (
        <>
            <button className="new-task-add" onClick={() => {setTaskAdding(true)}}>Добавить задачу</button>
            {isTaskAdding  ? <Taskform/> : null}
            <div className={isTaskAdding ? "shadowBack" : ""} onClick={() => {setTaskAdding(false)}}></div>
            <div className="task-manager wrapper">
                <div className="task-manager-columns">
                    {taskList}
                </div>
            </div>
        </>
    )
}

export default TaskManager


