import React, { useState, useEffect } from 'react'
import warningImg from  '../../img/warning.jpg'
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {taskListType} from './../../store/store';
import Task from '../Task/Task';

type storeState = {
    taskInfoReducer: taskListType[],
}


function TaskManager () {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: storeState) => state.taskInfoReducer)
    let [isTaskAdding, setTaskAdding] = useState<boolean>(false)
    
    let taskList = taskListInfo.map((column, columnId) => {
        return (
            <div className="tasks-column" key={columnId}>
                <div className="tasks-list" >
                    <div className={"task-list-title " + `column-${column.status}` }>{column.status}</div>
                    <div className='task-box'>  
                        {column.tasks.map((task, taskId) => {
                            return (
                                <Task currentStatus={columnId} currentTaskId={taskId} key={taskId}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    })

    function Taskform (props: any) {
        let [taskTitle, setTaskTitle] = useState('') 
        let [taskDescription, setTaskDescription] = useState('')
        let [taskPriority, setTaskPriority] = useState('')

        function addNewTask() {
            if (taskTitle != "" && taskPriority != "") {
                if (taskDescription != "") {
                    dispatch({type: "add_task", description: taskDescription, title: taskTitle, priority: parseInt(taskPriority)})
                } else 
                if (taskDescription == "") {
                    dispatch({type: "add_task", title: taskTitle, priority: parseInt(taskPriority)})
                }
                setTaskAdding(false)
            } else {
                alert("Неверно введены данные")
            }
        }

        return (
            <form className={"new-task-form " + (isTaskAdding ? "" : "inactive")}>
                <div className="new-task-form-block">
                    <input className="new-task-form__item" type="text" placeholder="Имя задачи (до 30 символов)" pattern="[A-Za-zА-Яа-яЁё\s]{1,30}" onChange={(element) => setTaskTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                    <input className="new-task-form__item" type="text" placeholder="Приоритет (от 1 до 3, где 1 - наибольший приоритет)" pattern="[1-3]" onChange={(element) => setTaskPriority((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                </div>
                <div className="new-task-form-block">
                    <textarea className="new-task-form__item new-task-form__textarea" maxLength={300}  placeholder="Описание задачи (до 300 символов)" onChange={(element) => setTaskDescription(element.target.value != '' ? element.target.value : "Описание не добавлено")}/>
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
            {isTaskAdding  ? <Taskform /> : null}
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


