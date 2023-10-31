import React, {ChangeEvent  , KeyboardEvent, useState} from 'react';
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
    changeFilter: (value: FilterValurType,  todolistID: string) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValurType
    id:string
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState(' ');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
          addTask()
        }
    }
    const onAllClickHandler = () => { props.changeFilter('all', props.id)}
    const onActiveClickHandler = () => { props.changeFilter('active', props.id)}
    const onCompletedClickHandler = () => {  props.changeFilter('completed', props.id)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onNewPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}
            >+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t =>{

                    const onRemoveHandler = () => {  props.removeTask(t.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                      props.changeTasksStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ''}>
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
            <button className={props.filter === 'all' ? "active-filter" : ''}
                onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ''}
                onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ''}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
