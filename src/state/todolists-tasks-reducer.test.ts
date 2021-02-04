import {TaskStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reduser";
import {AddTodoListAC, RemoveTodoListAC, todoListsReducer} from "./todolists-reduser";
import ToDoList from "../Components/ToDoList";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});

