import React from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";

function App() {

  const task1 = [
    {id: 1, title: 'HTML', isDone: true,},
    {id: 2, title: 'CSS', isDone: true,},
    {id: 3, title: 'HTML', isDone: false,}
  ]
  // const task2 = [
  //   {id:1, title: 'Apple', isDone: false},
  //   {id:2, title: 'Samsung', isDone: false},
  //   {id:1, title: 'Dell', isDone: true},
  // ]


  return (
    <div className="App">
    <ToDoList title = {'What to learn'} tasks = {task1}/>
    <p>Lorem</p>
    </div>
  );
}

export default App;
