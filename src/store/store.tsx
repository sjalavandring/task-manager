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
        subtasks?: {
            id: number,
            type: string,
            title: string,
            dateOfCreate: string,
            dateOfDone?: string,
            timeInDev?: string,
            description: string,
            priority: number,
        }[],

    }[]
}

let taskListInfo: taskListType[] = [
    {id: 1, status: "Queue", tasks: [
        {
            id: 1, 
            title: "Test tusk number one", 
            dateOfCreate: (new Date()).toISOString().slice(0,10),
            type: "task",
            description: "test description, test description, test description",
            priority: 3,
            subtasks: [{
                id: 1,
                type: "subtask",
                title: "subtask",
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: "test",
                priority: 1,
            }]
        }]},
    {id: 2, status: "Development", tasks: []},
    {id: 3, status: "Done", tasks: []}
]

let taskInfoReducer = (state = taskListInfo, action: any) => {
    switch (action.type) {
        case "add_task" :
            let newTasks = taskListInfo[0].tasks;
            newTasks.push({
                id: taskListInfo[0].tasks.length + 1, 
                type: "task",
                title: action.title, 
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: action.description,
                priority: action.priority,
            })
            return [{...state[0], tasks: newTasks}, {...state[1]}, {...state[2]}]
        default: 
            return state
    }
}

// const rootReducer = combineReducers({})

const store = createStore(taskInfoReducer)

export {store}
export type {taskListType}