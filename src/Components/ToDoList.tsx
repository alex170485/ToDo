import React, {ChangeEvent, useCallback, useState} from 'react';
import {TaskType} from "../App";

import {EditableSpan} from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import AddItemForm from "../AddItemForm";


type TitlePropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: string,
    RemoveTask: (taskId: string, todoListID: string) => void;
    changeFilter: (value: "all" | "active" | "completed", todoListID: string) => void;
    addTask: (value: string, todoListID: string) => void;
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void;
    removeTodoList: (todoListID: string) => void;
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
};


const ToDoList = React.memo((props: TitlePropsType) => {
    console.log("Todolist called")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const allClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [])
    const activeClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [])
    const completedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }


    return (
        <div>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan title={props.title}
                              changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {
                    tasksForTodolist.map(t => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)

                        }
                        return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                            <Checkbox
                                color={'primary'}
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />

                            <EditableSpan
                                title={t.title}
                                changeTitle={changeTaskTitle}
                            />
                            <IconButton onClick={() => {
                                props.RemoveTask(t.id, props.id)
                            }}><Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    //className={props.filter === 'all'?'active-filter': ''}
                    onClick={allClickHandler}
                    color={'primary'}
                    size={'small'}
                    style={{marginRight: '3px'}}
                >All</Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    //className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={activeClickHandler}
                    color={'primary'}
                    size={'small'}
                    style={{marginRight: '3px'}}
                >Active</Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    //className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={completedClickHandler}
                    color={'primary'}
                    size={'small'}
                >Completed</Button>
            </div>
        </div>
    );
})

export default ToDoList;