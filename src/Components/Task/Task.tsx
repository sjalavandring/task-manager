import React, { useState, useEffect } from 'react'
import warningImg from  '../../img/warning.jpg'
import type {taskListType} from './../../store/store';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import NewSubtaskForm from '../ModalWindows/NewSubtaskForm';

type storeState = {
    taskInfoReducer: taskListType[],
}


function Task (props: {projectId: number, currentTaskId: number, currentStatus: number}) {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: any) => state.taskInfoReducer[props.projectId].projectInfo)
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let [task, setTask] = useState(structuredClone(taskListInfo[props.currentStatus].tasks[props.currentTaskId]))
    let [isMoreInfoVisible, setMoreInfoVisible] = useState<boolean>(false)

    let [subtaskWindowVisible, setSubtaskWindowVisible] = useState(false)

    function closeSubtasskform () {
        setSubtaskWindowVisible(false)
    }


    
    return (
        <>
            <div className={isWindowOpened.isNewSubtaskAdding && subtaskWindowVisible ? "shadowBack " : ""} onClick={() => {dispatch({type: "toggle_new_subtask_window_status"}); setSubtaskWindowVisible(false)}}></div>
            {isWindowOpened.isNewSubtaskAdding && subtaskWindowVisible ? <NewSubtaskForm projectId={props.projectId} currentStatus={props.currentStatus} currentTaskId={props.currentTaskId} closeSubtasskform={closeSubtasskform}/> : undefined}
            <div className="task task-container" key={task.id} onClick={() => console.log(props, props.currentStatus)}>
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
                    <div className="task-row__item task-interactive-button" onClick={() => {dispatch({type: "toggle_new_subtask_window_status"}); setSubtaskWindowVisible(true)}}>+ Подзадача</div>
                    <div className="task-row__item task-interactive-button" onClick={() => setMoreInfoVisible(!isMoreInfoVisible)}>{isMoreInfoVisible ? "Скрыть": "Развернуть"}</div>
                </div>
                <div className={"" + (isMoreInfoVisible ? "" : "inactive")}>
                    <div className="task-row task-more-information">
                        <div className="task-row__item">{task.description ? task.description : "Описание не задано"}</div>
                    </div>
                    <div className="task-row">
                        <div className="task-row__item">Завершена: {task.dateOfDone ? task.dateOfDone: '-'}</div> 
                        <div className="task-row__item">В разработке: {task.timeInDev ? task.timeInDev : '-'}</div>
                    </div>
                </div> 
            </div>
            {taskListInfo[props.currentStatus].tasks[props.currentTaskId].subtasks != undefined ? taskListInfo[props.currentStatus].tasks[props.currentTaskId].subtasks.map((subtask: any, subtaskId: number) => {
                return (
                    <Subtask projectId={props.projectId} currentStatus={props.currentStatus} currentTaskId={props.currentTaskId} subtaskId={subtaskId} key={subtaskId}/>
                )                                  
            }) : ""}
        </>
    )
}

function Subtask (props: {projectId: number, currentTaskId: number, currentStatus: number, subtaskId: number}) {
    const taskListInfo = useSelector((state: any) => state.taskInfoReducer[props.projectId].projectInfo)
    let [isMoreInfoVisible, setMoreInfoVisible] = useState<boolean>(false)
    let subtask = taskListInfo[props.currentStatus].tasks[props.currentTaskId].subtasks[props.subtaskId]

    console.log(100)

    return (
        <div className="subtask" key={subtask.id} onClick={() => console.log(props)}>
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
                <div className="task-row__item task-interactive-button" onClick={() => setMoreInfoVisible(!isMoreInfoVisible)}>{isMoreInfoVisible ? "Скрыть": "Развернуть"}</div>
            </div>
            <div className={"" + (isMoreInfoVisible ? "" : "inactive")}>
                <div className="task-row task-more-information">
                    <div className="task-row__item">{subtask.description ? subtask.description : "Описание не задано"}</div>
                </div>
                <div className="task-row">
                    <div className="task-row__item">Завершена: {subtask.dateOfDone ? subtask.dateOfDone: '-'}</div> 
                    <div className="task-row__item">В разработке: {subtask.timeInDev ? subtask.timeInDev : '-'}</div>
                </div>
            </div> 
        </div>
    )
}


export default Task