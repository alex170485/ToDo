import { v1 } from "uuid";
import {FilterValueType, TodoListType} from "../App";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}


type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleType | ChangeTodoListFilterType
const initialState: Array<TodoListType> = []


export function todoListsReducer(state:Array<TodoListType> = initialState, action:ActionType ):Array<TodoListType> {
  switch (action.type) {
      case 'REMOVE-TODOLIST' :
          return state.filter(tl => tl.id !== action.id)
      case 'ADD-TODOLIST' :
          const newTodoList: TodoListType = {
              id: action.todoListId,
              title: action.title,
              filter: 'all'
          }
          return [...state, newTodoList ]
      case 'CHANGE-TODOLIST-TITLE' :
        const todoLists = state.map(tl => {
            if (tl.id === action.id) {
                return {...tl, title: action.title}
            } else {
                return tl
            }
        })
          return todoLists
      case 'CHANGE-TODOLIST-FILTER' : {
          const todoLists = state.map(tl => {
              if (tl.id === action.id) {
                  return {...tl, filter: action.filter}
              }
              return tl
          })
          return todoLists
      }

      default:
          return state;

  }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id }
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: "all" | "active" | "completed"): ChangeTodoListFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
