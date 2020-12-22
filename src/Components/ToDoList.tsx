import React, {ChangeEvent, useState} from 'react';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean;

}

type TitlePropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: string,
    RemoveTask: (taskId: string) => void;
    changeFilter: (value: "all" | "active" | "completed") => void;
    addTask: (value: string) => void;
    changeStatus:(id: string, isDone: boolean) => void;
};


function ToDoList(props: TitlePropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string|null>(null)

    const AddTask = () => {
        let trimmedTask = title.trim();
        if(trimmedTask) {
            props.addTask(trimmedTask);
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
const allClickHandler = () => { props.changeFilter("all")};
const activeClickHandler = () => {props.changeFilter("active")};
const completedClickHandler = () => {props.changeFilter("completed") };






    return (
        <div>
            <h3>{props.title}</h3>
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
                           props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return <li className={t.isDone ? 'is-done' : ''} key={t.id} >
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHAndler}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.RemoveTask(t.id)
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