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
        files?: string[] | [],
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
    }[] | [],
}

type ProjectsListType = {
    id: number,
    title: string,
    projectInfo: taskListType[]
}

let taskListInfo: ProjectsListType[] = [
    {
        id: 1, 
        title: 'Project 1',
        projectInfo: [{
            id: 1, 
            status: "Queue", 
            tasks: [
                {
                    id: 1, 
                    title: "Test task number one", 
                    dateOfCreate: (new Date()).toISOString().slice(0,10),
                    type: "task",
                    description: "test description, test description, test description test description, test description, test description test description, test description, test description test description, test description, test description",
                    priority: 3,
                    files: [],
                    subtasks: [{
                        id: 1,
                        type: "subtask",
                        title: "subtask",
                        dateOfCreate: (new Date()).toISOString().slice(0,10),
                        description: "test test description, test description, test description test description, test description, test description test de",
                        priority: 1,
                    }]
                }
                ]
            },
            {id: 2, status: "Development", tasks: []},
            {id: 3, status: "Done", tasks: []},
        ],
    },
]

type ModalInfoType = {
    isNewTaskAdding: boolean,
    isNewSubtaskAdding: boolean,
    isNewProjectAdding: boolean,
}

let modalWindowsStatus = {
    isNewTaskAdding: false,
    isNewSubtaskAdding: false,
    isNewProjectAdding: false,
}

let taskInfoReducer = (state: any = taskListInfo, action: any) => {
    let newState = structuredClone(state);
    switch (action.type) {
        case "add_task" :
            let newProjectsTasks = structuredClone(state[action.project].projectInfo[0].tasks)
            newProjectsTasks.push({
                id: state[action.project].projectInfo[0].tasks.length + state[action.project].projectInfo[1].tasks.length + state[action.project].projectInfo[2].tasks.length + 1, 
                type: "task",
                title: action.title, 
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: action.description,
                priority: action.priority,
                subtasks: []
            })
            newState[action.project].projectInfo[0].tasks = structuredClone(newProjectsTasks)
            console.log(state)
            return newState 
        case "add_subtask": 
            let newSubtasks = structuredClone(state[action.project].projectInfo[action.taskStatus].tasks[action.taskId].subtasks);
            newSubtasks.push({
                id: newSubtasks.length + 1, 
                type: "subtask",
                title: action.title, 
                dateOfCreate: (new Date()).toISOString().slice(0,10),
                description: action.description,
                priority: action.priority,
            })
            newState[action.project].projectInfo[action.taskStatus].tasks[action.taskId].subtasks = structuredClone(newSubtasks)
            return newState
        case 'add_new_task_files':
            let newProjectsTasksWithFiles = structuredClone(state[action.project].projectInfo[0].tasks)
            newProjectsTasksWithFiles[newProjectsTasksWithFiles.length - 1] = {...newProjectsTasksWithFiles[newProjectsTasksWithFiles.length - 1], files: action.files}
            console.log(newProjectsTasksWithFiles)
            newState[action.project].projectInfo[0].tasks = structuredClone(newProjectsTasksWithFiles)
            return newState
        case 'add_new_project':
            let newProjectsList = structuredClone(state)
            newProjectsList.push({
                id: newProjectsList.length + 1, 
                title: action.projectTitle,
                projectInfo: [
                    {id: 1, status: "Queue", tasks: []},
                    {id: 2, status: "Development", tasks: []},
                    {id: 3, status: "Done", tasks: []},
                ]
            }) 
            console.log(newProjectsList)
            return newProjectsList
        case "move_to_development":
            let taskId = action.searchedId;
            console.log('taskId', taskId)
            let queueTasks = newState[action.projectId].projectInfo.find((info: any) => info.id == action.moveTaskFrom + 1)
            
            if (queueTasks) {
                queueTasks.tasks.forEach((task: any) => console.log(task.id, taskId))
                // let taskIndex = queueTasks.tasks.findIndex((task: any, taskIndex: number) => task.id  == taskId);
                let taskIndex = taskId

                // console.log(newState[action.projectId].projectInfo.tasks)
                // let queueTasks = newState[action.projectId].projectInfo.tasks[taskId]
                queueTasks.tasks.forEach((task: any) => console.log(task.id, queueTasks.tasks[0].id))
                if (taskIndex !== -1) {
                    let taskToMove = queueTasks.tasks.splice(taskIndex, 1)[0]; // Удаляем задачу из очереди и получаем ее
                    let developmentTasks = newState[action.projectId].projectInfo.find((info: any) => info.id== action.moveTaskTo + 1);
                    if (developmentTasks) {
                     developmentTasks.tasks.push(taskToMove); 
                    }
                }
                queueTasks.tasks.forEach((task: any) => console.log(task.id, taskId))
            }
            console.log(newState)
            return newState;
        default: 
            return state
    }
}

let modalWindowsReducer = (state = modalWindowsStatus, action: any) => {
    switch (action.type) {
        case 'toggle_new_task_window_status':
            return {...state, isNewTaskAdding: !state.isNewTaskAdding}
        case 'toggle_new_subtask_window_status':
            return {...state, isNewSubtaskAdding: !state.isNewSubtaskAdding}
        case 'toggle_new_project_window_status':
            return {...state, isNewProjectAdding: !state.isNewProjectAdding}
        case 'reset_all': 
            return {...state, isNewSubtaskAdding: false, isNewTaskAdding: false}
        default: 
            return state
    }
}

let projectsInfoReducer = (state = taskListInfo, action: any) => {
    switch (action.type) {
        case 'add_new_project':
            console.log(1)
            let newProjectsList = structuredClone(state)
            newProjectsList.push({
                id: newProjectsList.length + 1, 
                title: action.projectTitle,
                projectInfo: [
                    {id: 1, status: "Queue", tasks: []},
                    {id: 2, status: "Development", tasks: []},
                    {id: 3, status: "Done", tasks: []},
                ]
            }) 
            console.log(newProjectsList)
            return newProjectsList
        default: 
            return state
    }
}

const rootReducer = combineReducers({ modalWindowsReducer, projectsInfoReducer, taskInfoReducer})

const store = createStore(rootReducer)

export {store}
export type {taskListType, ModalInfoType, ProjectsListType}