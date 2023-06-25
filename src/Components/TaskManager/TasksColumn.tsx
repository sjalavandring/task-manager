import React from "react"
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux/es/exports'
import Task from '../Task/Task';

function TaskColumn (props: {projectId: number, column: any, columnId: number}) {
    const dispatch = useDispatch()
    let taskListInfo = useSelector((state: any) => state.taskInfoReducer)

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: () => ({
            columnId: props.columnId,
        }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    return (
        <div className="tasks-column" ref={drop} key={props.columnId}>
            <div className="tasks-list" >
                <div className={"task-list-title " + `column-${props.column.status}` }>{props.column.status}</div>
                <div className='task-box'>  
                    {props.column.tasks.map((task: any, taskId: number) => {
                        return (
                            <Task currentStatus={props.columnId} currentTaskId={taskId} projectId={props.projectId} key={taskId}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TaskColumn