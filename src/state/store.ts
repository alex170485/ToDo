import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reduser";
import {todoListsReducer} from "./todolists-reduser";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
//@ts-ignore
window.store = store;