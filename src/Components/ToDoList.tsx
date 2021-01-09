import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "../App";


type TitlePropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: string,
    RemoveTask: (taskId: string, todoListID:string) => void;
    changeFilter: (value: "all" | "active" | "completed", todoListID:string) => void;
    addTask: (value: string, todoListID:string) => void;
    changeStatus:(id: string, isDone: boolean, todoListID:string) => void;
    removeTodoList:(todoListID: string) => void;
};


function ToDoList(props: TitlePropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string|null>(null)

    const AddTask = () => {
        let taskTitle = title.trim();
        if(taskTitle) {
            props.addTask(taskTitle, props.id);
        } else {
            setError('Title is required!')
        }
        setTitle('');
        };
    const onKeyPressHandler = (e:any) => {
        if (e.charCode === 13)
        {
            AddTask()}
    };

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value)};
const allClickHandler = () => { props.changeFilter("all", props.id)};
const activeClickHandler = () => {props.changeFilter("active", props.id)};
const completedClickHandler = () => {props.changeFilter("completed", props.id) };
const removeTodoList = () => {props.removeTodoList(props.id)};


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={AddTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeHAndler = (e:ChangeEvent<HTMLInputElement>) => {
                           props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li className={t.isDone ? 'is-done' : ''} key={t.id} >
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHAndler}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.RemoveTask(t.id, props.id)
                            }}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all'?'active-filter': ''}
                        onClick={allClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={activeClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={completedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default ToDoList;