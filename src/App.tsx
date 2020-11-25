import React, {useState} from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true,},
        {id: v1(), title: 'CSS', isDone: true,},
        {id: v1(), title: 'HTML', isDone: false,},
        {id: v1(), title: 'RestApi', isDone: false,}
    ])

    type FilterValueType = "all" | "active" | "completed";
    let [filter, setFilter] = useState<FilterValueType>("all");
    let tasksForToDoList = tasks;
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone === true)

    }

    function RemoveTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    function changeFilter(value: "all" | "completed" | "active") {
        setFilter(value)
    }
    function addTask(title: string) {
        let task = {id: v1() , title: title , isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);

    }


    return (
        <div className="App">
            <ToDoList title={'What to learn'} tasks={tasksForToDoList}
                      RemoveTask={RemoveTask}
                      changeFilter = {changeFilter}
                      addTask = {addTask}



            />
        </div>
    );
}

export default App;
