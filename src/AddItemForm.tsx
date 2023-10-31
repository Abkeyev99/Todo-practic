import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addTask: (title: string, todolistID: string) => void
    id: string
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState(' ');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    return <div>
        <input
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onNewPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}
        >+
        </button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}