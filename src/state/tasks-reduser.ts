import {v1} from "uuid";
import {FilterValueType, TaskStateType, TaskType, TodoListType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reduser";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string

}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}
type ChangeTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskID: string
    title: string
    todolistID: string

}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const inicialState: TaskStateType = {}

export function tasksReducer(state: TaskStateType = inicialState, action: ActionType):TaskStateType {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            let copyState = {...state}
            copyState[action.todolistID] =
                copyState[action.todolistID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case 'ADD-TASK' : {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => {
                        if (task.id !== action.taskID) {
                            return task
                        } else {
                            return {...task, isDone: action.isDone}
                        }
                    })
            }
        }
        case 'CHANGE-TITLE-TASK' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => {
                        if (task.id !== action.taskID) {
                            return task
                        } else {
                            return {...task, title: action.title}
                        }
                    })
            }
        }
        case 'ADD-TODOLIST' : {
            return {
                ...state,
                [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.id]

            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskId, todolistID: todolistId}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskId, isDone, todolistID}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskID: title, title: title, todolistID}
}