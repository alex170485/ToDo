import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "../App";
import AddItemForm from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


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


function ToDoList(props: TitlePropsType) {
    /* let [title, setTitle] = useState('');
     let [error, setError] = useState<string|null>(null)*/

    /*    const AddTask = () => {
            let taskTitle = title.trim();
            if(taskTitle) {
                props.addTask(taskTitle, props.id);
            } else {
                setError('Title is required!')
            }
            setTitle('');
            };*/
    /*  const onKeyPressHandler = (e:any) => {
          if (e.charCode === 13)
          {
              AddTask()}
      };*/

    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)};*/

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const allClickHandler = () => {
        props.changeFilter("all", props.id)
    };
    const activeClickHandler = () => {
        props.changeFilter("active", props.id)
    };
    const completedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
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
            {/*<div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={AddTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>*/}
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {
                    props.tasks.map(t => {

                        const onChangeHAndler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)

                        }
                        return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                            <Checkbox
                            color={'primary'}
                            checked={t.isDone}
                            onChange={onChangeHAndler}
                            />
                            {/*<input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHAndler}/>*/}
                            {/*<span>{t.title}</span>*/}
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
}

export default ToDoList;