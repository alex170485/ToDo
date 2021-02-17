import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "active" | "completed";
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean;
}

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists )
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();






    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)

    };

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
       dispatch(action)
    };

    function RemoveTask(taskID: string, todoListID: string) {
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        const action = ChangeTodolistFilterAC(todoListID, filterValue);
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = AddTodoListAC(title);
        dispatch(action);

    }

    function changeTodoListTitle(id: string, title: string) {
        const action = ChangeTodolistTitleAC(id, title)
        dispatch(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}} >
                    <div style = {{display:'flex'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                        <Typography variant="h6" style={{flexDirection: 'row', padding: '10px'}}>
                            Todolist
                        </Typography>
                        <Typography variant="h6" style={{flexDirection: 'row', padding: '10px'}}>
                            News
                        </Typography>
                        <Typography variant="h6" style={{flexDirection: 'row', padding: '10px'}}>
                            About
                        </Typography>
                    </div>
                    <Button color="inherit">Login</Button>

                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container style={{padding: '20px'}}>
                    {
                        todoLists.map(tl  => {
                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10}
                                           style={{padding: '10px', margin: '10px'}}>
                                        <ToDoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            filter={tl.filter}
                                            RemoveTask={RemoveTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
