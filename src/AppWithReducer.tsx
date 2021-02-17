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
    const todoListID1 = v1();
    const todoListID2 = v1();


    const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer,[
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todoListID1]: [{id: v1(), title: 'HTML', isDone: true,},
                {id: v1(), title: 'CSS', isDone: true,},
                {id: v1(), title: 'HTML', isDone: false,},
                {id: v1(), title: 'RestApi', isDone: false,}]
            ,
            [todoListID2]: [
                {id: v1(), title: 'BooK', isDone: true,},
                {id: v1(), title: 'Milk', isDone: true,},
                {id: v1(), title: 'Car', isDone: false,},
                {id: v1(), title: 'Apple', isDone: false,}
            ]
        })

    let tasksForToDoList = tasks;

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatchToTasks(action)

    };

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
       dispatchToTasks(action)
    };

    function RemoveTask(taskID: string, todoListID: string) {
        const action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        const action = ChangeTodolistFilterAC(todoListID, filterValue);
        dispatchToTodolist(action)
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatchToTasks(action)
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatchToTodolist(action)
    }

    function addTodolist(title: string) {
        const action = AddTodoListAC(title);
        dispatchToTasks(action);
        dispatchToTodolist(action)
    }

    function changeTodoListTitle(id: string, title: string) {
        const action = ChangeTodolistTitleAC(id, title)
        dispatchToTodolist(action)
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
                        todoLists.map(tl => {
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
