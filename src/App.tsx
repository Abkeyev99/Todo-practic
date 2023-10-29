import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValurType = 'all' | 'action' | 'completed'


function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: true},
        {id: 5, title: "ModX", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValurType>('all')
    let tasksForTodolist = tasks;

    if (filter === 'action') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter (value: FilterValurType) {
        setFilter(value)
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
