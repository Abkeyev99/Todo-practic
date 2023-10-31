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

    function changeFilter(value: FilterValurType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string, todolistID:string) {
        let tasks = tasksObj[todolistID];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistID] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string,  todolistID:string) {
        let task = {id: v1(), title, isDone: false};
        let tasks = tasksObj[todolistID];
        let newTasks = [task, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean,  todolistID:string) {
        let tasks = tasksObj[todolistID];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: 'active'},
        {id: todolistID2, title: "What to buy", filter: 'completed'}
    ]);

    let removeTodolist = (todolistID:string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistID)
   setTodolists(filteredTodolist)
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    let [tasksObj, setTasksObj] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "ModX", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false}
        ]


    })

    return (
        <div className="App">
            {todolists.map((tl) => {

                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
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
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    )
}

export default App;
