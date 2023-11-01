import React, {ChangeEvent} from 'react';
import {FilterValurType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValurType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTasksTitle: (taskId: string, newTitle: string, todolistID: string) => void
    changeTodolistStatus: (taskId: string, newTitle: string) => void
    filter: FilterValurType
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const ChangeTodolistTitle = (newTitle: string) => {
        props.changeTodolistStatus(props.id, newTitle)
    }

    return <div>
        <h3> <EditableSpan title={props.title} onChange={ChangeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm
            addItem={addTask}
        />
        <ul>
            {
                props.tasks.map(t => {

                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTasksTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ''}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>
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

