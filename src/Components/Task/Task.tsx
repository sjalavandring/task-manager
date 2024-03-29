import React, { useEffect, useState } from 'react';
import axios from 'axios';
import warningImg from  '../../img/warning.jpg'
import type {taskListType} from './../../store/store';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import NewSubtaskForm from '../ModalWindows/NewSubtaskForm';
// import { response } from 'express';
import { useDrag } from 'react-dnd'
import { type } from '@testing-library/user-event/dist/type';

type storeState = {
    taskInfoReducer: taskListType[],
}

type DropResult = {
    name: string
}

function Task (props: {projectId: number, currentTaskId: number, currentStatus: number}) {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: any) => state.taskInfoReducer[props.projectId].projectInfo)
    const isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let [task, setTask] = useState(structuredClone(taskListInfo[props.currentStatus].tasks[props.currentTaskId]))
    let [isMoreInfoVisible, setMoreInfoVisible] = useState<boolean>(false)
    let [subtaskWindowVisible, setSubtaskWindowVisible] = useState(false)

    React.useEffect(() => {
        setTask(structuredClone(taskListInfo[props.currentStatus].tasks[props.currentTaskId]))
    }, [taskListInfo ])

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: {taskInfo: task, columnInfo: props.currentStatus},
        end: (item, monitor) => {
            const dropResult: any = monitor.getDropResult()
            if (item.columnInfo != dropResult.columnId) {
                let currentTaskIndex: number = taskListInfo[props.currentStatus].tasks.findIndex((currentTask: any) => currentTask.id == task.id)
                dispatch({type: "move_to_development", searchedId: currentTaskIndex, projectId: props.projectId, moveTaskFrom: item.columnInfo, moveTaskTo: dropResult.columnId})
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    
    function closeSubtasskform () {
        setSubtaskWindowVisible(false)
    }

    // async function getData() {
    //     await axios.get('http://localhost:3001/getinfo')
    //     .then((res) => {
    //         console.log(res)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
    
    // useEffect(() => {
    //     getData()
    // })

    return (
        <>
            <div className={isWindowOpened.isNewSubtaskAdding && subtaskWindowVisible ? "shadowBack " : ""} onClick={() => {dispatch({type: "toggle_new_subtask_window_status"}); setSubtaskWindowVisible(false)}}></div>
            {isWindowOpened.isNewSubtaskAdding && subtaskWindowVisible ? <NewSubtaskForm projectId={props.projectId} currentStatus={props.currentStatus} currentTaskId={props.currentTaskId} closeSubtasskform={closeSubtasskform}/> : undefined}
            <div className="task task-container" key={task.id} ref={drag} onClick={() => dispatch({type: "move_to_development", searchedId: task.id, projectId: props.projectId, moveTaskFrom: 0, moveTaskTo: 1})}>
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
                        {/* <div className="task-row__item task-files"></div>  */}
                    </div>
                    {/* <div className="task-row">
                        <div className="task-row__item">{task.description ? task.description : "Описание не задано"}</div>
                    </div> */}
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