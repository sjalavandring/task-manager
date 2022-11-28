import {combineReducers, createStore} from 'redux'

type taskListType = {
    id: number,
    status: string,
    tasks: {
        id: number,
        title: string
    }[]
}

let taskListInfo: taskListType[] = [
    {id: 1, status: "Queue", tasks: [{id: 1, title: "Task1"}, {id: 2, title: "Task2"}, {id: 3, title: "Task3"}]},
    {id: 2, status: "Development", tasks: [{id: 4, title: "Task4"}, {id: 5, title: "Task5"}, {id: 6, title: "Task6"}]},
    {id: 3, status: "Done", tasks: [{id: 7, title: "Task7"}, {id: 8, title: "Task8"}, {id: 9, title: "Task9"}]}
]

let taskInfoReducer = (state = taskListInfo, action: any) => {
    switch (action.type) {
        default: 
            return state
    }
}

// const rootReducer = combineReducers({})

const store = createStore(taskInfoReducer)

export {store}
export type {taskListType}