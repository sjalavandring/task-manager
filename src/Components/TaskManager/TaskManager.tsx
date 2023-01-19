import React, { useState, useEffect } from 'react'
import warningImg from  '../../img/warning.jpg'
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {taskListType} from './../../store/store';
import NewTaskForm from '../ModalWindows/NewTaskForm';
import Task from '../Task/Task';
import NewSubtaskForm from '../ModalWindows/NewSubtaskForm';

type storeState = {
    modalWindowsReducer: taskListType[],
}

function TaskManager (props: {projectId: number}) {
    const dispatch = useDispatch()
    let taskListInfo = useSelector((state: any) => state.projectsInfoReducer[props.projectId].projectInfo)
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)

    let taskList =  taskListInfo.map((column: any, columnId: number) => {
        return (
            <div className="tasks-column" key={columnId}>
                <div className="tasks-list" >
                    <div className={"task-list-title " + `column-${column.status}` }>{column.status}</div>
                    <div className='task-box'>  
                        {column.tasks.map((task: any, taskId: number) => {
                            return (
                                <Task currentStatus={columnId} currentTaskId={taskId} projectId={props.projectId} key={taskId}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <button className="new-task-add" onClick={() => dispatch({type: "toggle_new_task_window_status"})}>Добавить задачу</button>
            {isWindowOpened.isNewTaskAdding  ? <NewTaskForm projectId={props.projectId}/> : null}
            <div className={isWindowOpened.isNewTaskAdding ? "shadowBack" : ""} onClick={() => dispatch({type: "toggle_new_task_window_status"})}></div>
            <div className="task-manager wrapper">
                <div className="task-manager-columns">
                    {taskList}
                </div>
            </div>
        </>
    )
}

export default TaskManager


