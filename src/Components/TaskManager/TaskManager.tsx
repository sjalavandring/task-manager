import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {taskListType} from './../../store/store';
import NewTaskForm from '../ModalWindows/NewTaskForm';
import TaskColumn from './TasksColumn';

type storeState = {
    modalWindowsReducer: taskListType[],
}

function TaskManager (props: {projectId: number}) {
    const dispatch = useDispatch()
    let taskListInfo = useSelector((state: any) => state.taskInfoReducer)
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)

    let taskList = taskListInfo ? taskListInfo[props.projectId].projectInfo.map((column: any, columnId: number) => {
        return (
            <TaskColumn projectId={props.projectId} column={column} columnId={columnId}/>
        )
    }) : null

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


