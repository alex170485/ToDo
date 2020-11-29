import React, {ChangeEvent, useState} from 'react';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean;

}

type TitlePropsType = {
    title: string,
    tasks: Array<TaskType>
    RemoveTask: (taskId: string) => void;
    changeFilter: (value: "all" | "active" | "completed") => void;
    addTask: (value: string) => void;
};


function ToDoList(props: TitlePropsType) {
    let [title, setTitle] = useState('');

    const AddTask = () => {
            props.addTask(title);
            setTitle('')
        }
    ;
const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)};
const allClickHandler = () => { props.changeFilter("all")};
const activeClickHandler = () => {props.changeFilter("active")};
const completedClickHandler = () => {props.changeFilter("completed") }





    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={e=> {if (e.charCode === 13) {AddTask()}}}/>
                <button onClick={AddTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={() => {
                                props.RemoveTask(t.id)
                            }}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={allClickHandler}>All
                </button>
                <button onClick={activeClickHandler}>Active
                </button>
                <button onClick={completedClickHandler
                }>Completed
                </button>
            </div>
        </div>
    );
}

export default ToDoList;