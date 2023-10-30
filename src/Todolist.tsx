import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
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
    changeFilter: (value: FilterValurType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState(' ');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewPressHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => { props.changeFilter('all')}
    const onActiveClickHandler = () => { props.changeFilter('action')}
    const onCompletedClickHandler = () => {  props.changeFilter('completed')}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}/>
            <button onClick={addTask}
                    onKeyUp={onNewPressHandler}
            >+</button>
        </div>
        <ul>
            {
                props.tasks.map(t =>{

                    const onRemoveHandler = () => {  props.removeTask(t.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                      props.changeTasksStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id}>
                    <input
                        type="checkbox"
                        onChange={onChangeHandler}
                        checked={t.isDone}/>
                        <span>{t.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All
            </button>
            <button onClick={onActiveClickHandler}>Active
            </button>
            <button onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
