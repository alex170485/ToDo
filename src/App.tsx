import React, {useState} from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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
type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todoListID1 = v1();
    const todoListID2 = v1();


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>(
        {
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
        const todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks});
        }
    };

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    function RemoveTask(id: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks});
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodolist(todoListTitle: string) {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: todoListTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListID]: []
        })
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
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

export default App;
