import React, {useState} from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true,},
        {id: 2, title: 'CSS', isDone: true,},
        {id: 3, title: 'HTML', isDone: false,},
        {id: 4, title: 'RestApi', isDone: false,}
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

    function RemoveTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    function changeFilter(value: "all" | "completed" | "active") {
        setFilter(value)
    }


    return (
        <div className="App">
            <ToDoList title={'What to learn'} tasks={tasksForToDoList}
                      RemoveTask={RemoveTask}
                      changeFilter = {changeFilter}



            />
        </div>
    );
}

export default App;
