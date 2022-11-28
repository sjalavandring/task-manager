import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {taskListType} from './../../store/store';

function TaskManager () {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: taskListType[]) => state)
    let taskList = taskListInfo.map((column: taskListType) => {
        return (
            <div className="tasks-column">
                <div className="tasks-list">
                    <div className={"task-list-title " + `column-${column.status}` }>{column.status}</div>
                    {column.tasks.map((task) => {
                        return (
                            <div className="task" draggable="true">{task.title}</div>
                        )
                    })}
                </div>
            </div>
        )
    })

    return (
        <div className="task-manager wrapper">
            <div className="task-manager-columns">
                {taskList}
            </div>
        </div>
    )
}

export default TaskManager


