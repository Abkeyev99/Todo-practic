import React from 'react';
import {FilterValurType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValurType)=> void
    addTask: () => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button onClick={()=>{props.addTask()}}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t=> <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={()=> {props.removeTask(t.id)}}>x</button>
                </li>)}
        </ul>
        <div>
            <button onClick={()=>{props.changeFilter('all')}}>All</button>
            <button onClick={()=>{props.changeFilter('action')}}>Active</button>
            <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
}
