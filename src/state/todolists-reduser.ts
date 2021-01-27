import { v1 } from "uuid";
import {FilterValueType, TodoListType} from "../App";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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


export function todoListsReducer(state: TodoListType[], action:ActionType ) {
  switch (action.type) {
      case 'REMOVE-TODOLIST' :
          return state.filter(tl => tl.id !== action.id)
      case 'ADD-TODOLIST' :
          const newTodoList: TodoListType = {
              id: v1(),
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
          return state
  }
}