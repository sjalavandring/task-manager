import {combineReducers, createStore} from 'redux'

type CommentType = {
    text: string,
    subcomments: CommentType[],
}

type taskListType = {
    id: number,
    status: string,
    tasks: {
        id: number,
        type: string,
        title: string,
        dateOfCreate: string,
        dateOfDone?: string,
        timeInDev?: string,
        description: string,
        priority: number,
        comments?: CommentType,
        subtasks: {
            id: number,
            type: string,
            title: string,
            dateOfCreate: string,
            dateOfDone?: string,
            timeInDev?: string,
            description: string,
            priority: number,
        }[] | [],
    }[]
}

let taskListInfo: taskListType[] = [
    {id: 1, status: "Queue", tasks: [
        {
            id: 1, 
            title: "Test tusk number one", 
            dateOfCreate: (new Date()).toISOString().slice(0,10),
            type: "task",
            description: "test description, test description, test description test description, test description, test description test description, test description, test description test description, test description, test description",
            priority: 3,
            subtasks: [{
                id: 1,
                type: "subtask",
                title: "subtask",
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: "test test description, test description, test description test description, test description, test description test de",
                priority: 1,
            }]
        }]},
    {id: 2, status: "Development", tasks: []},
    {id: 3, status: "Done", tasks: []}
]

type ModalInfoType = {
    isNewTaskAdding: boolean
}

let modalWindowsStatus = {
    isNewTaskAdding: false,
}

let taskInfoReducer = (state = taskListInfo, action: any) => {
    let newState = structuredClone(state);
    switch (action.type) {
        case "add_task" :
            let newTasks = state[0].tasks;
            newTasks.push({
                id: state[0].tasks.length + 1, 
                type: "task",
                title: action.title, 
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: action.description,
                priority: action.priority,
                subtasks: []
            })
            return [{...state[0], tasks: newTasks}, {...state[1]}, {...state[2]}]
        case "add_subtask": 
            let newSubtasks: any = structuredClone(state[action.taskStatus].tasks[action.taskId].subtasks);
            newSubtasks.push({
                id: newSubtasks.length + 1, 
                type: "subtask",
                title: action.title, 
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: action.description,
                priority: action.priority,
            })
            newState[action.taskStatus].tasks[action.taskId].subtasks = newSubtasks
            console.log(newSubtasks)
            console.log(newState)
            return [...newState]
        default: 
            return state
    }
}

let modalWindowsReducer = (state = modalWindowsStatus, action: any) => {
        switch (action.type) {
            case 'toggle_new_subtask_window_status':
                return {...state, isNewTaskAdding: !state.isNewTaskAdding}
            default: 
                return state
        }  
}

const rootReducer = combineReducers({taskInfoReducer, modalWindowsReducer})

const store = createStore(rootReducer)

export {store}
export type {taskListType, ModalInfoType}