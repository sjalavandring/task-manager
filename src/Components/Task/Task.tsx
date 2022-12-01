import React, { useState, useEffect } from 'react'
import warningImg from  '../../img/warning.jpg'
import type {taskListType} from './../../store/store';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import NewSubtaskForm from '../ModalWindows/NewSubtaskForm';

type storeState = {
    taskInfoReducer: taskListType[],
}


function Task (props: {currentTaskId: number, currentStatus: number}) {
    const dispatch = useDispatch()
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    const taskListInfo = useSelector((state: storeState) => state.taskInfoReducer)
    let task = taskListInfo[props.currentStatus].tasks[props.currentTaskId];
    let [isMoreInfoVisible, setMoreInfoVisible] = useState<boolean>(false)
    
    return (
        <>
            <div className={"" + (isWindowOpened.isNewTaskAdding ? "shadowBack" : "")} onClick={() => dispatch({type: "toggle_new_subtask_window_status"})}></div>
            {isWindowOpened.isNewTaskAdding  ? <NewSubtaskForm currentStatus={props.currentTaskId} currentTaskId={props.currentTaskId}/> : null}
            <div className="task task-container" key={task.id}>
                <div className="task-row">
                    <div className="task-row__item task-title"><b>{`${task.id}. ${task.title}`}</b></div>
                    <div className="task-row__item">
                        {[...Array(task.priority)].map((item, id) => {
                            return (<img src={warningImg} alt="task-priority" width="25px" height="25px" key={id}/>)
                        })}
                    </div>
                </div>
                
                <div className="task-row">
                    <div className="task-row__item">Создана: {task.dateOfCreate}</div>
                    <div className="task-row__item task-interactive-button" onClick={() => dispatch({type: "toggle_new_subtask_window_status"})}>+ Подзадача</div>
                    <div className="task-row__item task-interactive-button" onClick={() => setMoreInfoVisible(!isMoreInfoVisible)}>{isMoreInfoVisible ? "Скрыть": "Развернуть"}</div>
                </div>
                <div className={"" + (isMoreInfoVisible ? "" : "inactive")}>
                    <div className="task-row task-more-information">
                        <div className="task-row__item">{task.description}</div>
                    </div>
                    <div className="task-row">
                        <div className="task-row__item">Завершена: {task.dateOfDone ? task.dateOfDone: '-'}</div> 
                        <div className="task-row__item">В разработке: {task.timeInDev ? task.timeInDev : '-'}</div>
                    </div>
                </div> 
            </div>
            {task.subtasks != undefined ? task.subtasks.map((subtask, subtaskId) => {
                return (
                    <Subtask currentStatus={props.currentStatus} currentTaskId={props.currentTaskId} subtaskId={subtaskId} key={subtaskId}/>
                )                                  
            }) : ""}
        </>
    )
}

function Subtask (props: {currentTaskId: number, currentStatus: number, subtaskId: number}) {
    const taskListInfo = useSelector((state: storeState) => state.taskInfoReducer)
    let [isMoreInfoVisible, setMoreInfoVisible] = useState<boolean>(false)
    let subtask = taskListInfo[props.currentStatus].tasks[props.currentTaskId].subtasks[props.subtaskId]

    return (
        <div className="subtask" key={subtask.id}>
            <div className="task-row">
                <div className="task-row__item task-title"><b>{`${props.currentTaskId + 1}.${subtask.id}. ${subtask.title}`}</b></div>
                <div className="task-row__item">
                    {[...Array(subtask.priority)].map((item, id) => {
                        return (
                            <img src={warningImg} alt="task-priority" width="25px" height="25px" key={id}/>
                        )
                    })}
                </div>
            </div>
            <div className="task-row">
                <div className="task-row__item">Создана: {subtask.dateOfCreate}</div>
                <div className="task-row__item task-showmore" onClick={() => setMoreInfoVisible(!isMoreInfoVisible)}>{isMoreInfoVisible ? "Скрыть": "Развернуть"}</div>
            </div>
            <div className={"" + (isMoreInfoVisible ? "" : "inactive")}>
                <div className="task-row task-more-information">
                    <div className="task-row__item">{subtask.description}</div>
                </div>
                <div className="task-row">
                    <div className="task-row__item">Завершена: asdasdasdass{subtask.dateOfDone ? subtask.dateOfDone: '-'}</div> 
                    <div className="task-row__item">В разработке: asdasdasdasd{subtask.timeInDev ? subtask.timeInDev : '-'}</div>
                </div>
            </div> 
        </div>
    )
}


export default Task