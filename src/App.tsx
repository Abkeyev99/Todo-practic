import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValurType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValurType
}

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "ModX", isDone: false}
    ])

    function changeFilter(value: FilterValurType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    let [todolists, setTodolists] = useState<Array<TodolistType>>( [
        {id: v1(), title: "What to learn", filter: 'active'},
        {id: v1(), title: "What to buy", filter: 'completed'}
    ])

    return (
        <div className="App">
            {todolists.map((tl) => {

                let tasksForTodolist = tasks;

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone === true)
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTasksStatus={changeStatus}
                    filter={tl.filter}
                />
            })}

        </div>
    )
}

export default App;
