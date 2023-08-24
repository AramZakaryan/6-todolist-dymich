import React, {ChangeEvent, useState} from "react";
import {CondType} from "./App";
import {Simulate} from "react-dom/test-utils";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (removeTaskId: string, todolistId: string) => void
    changeFilterCond: (cond: CondType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filterCond: CondType
}


export function Todolist(props: TodolistPropsType) {

    const [inpValue,
        setInpValue]
        = useState("")

    const [error, setError] = useState(false)

    const AddBtnOnClickHandler = () => {
        if (inpValue.trim() !== "") {
            props.addTask(inpValue, props.todolistId)
            setInpValue("")
        } else {
            setError(true)
        }
    }

    const inpOnChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(ev.currentTarget.value)
        setError(false)
    }

    const enterInpOnKeyDownHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.code === "Enter" && inpValue.trim() !== "") {
            props.addTask(inpValue, props.todolistId)
            setInpValue("")
        } else {
            setError(true)
        }
    }

    const AllBtnOnClickHandler = () => {
        props.changeFilterCond("All", props.todolistId)
    }

    const ActiveBtnOnClickHandler = () => {
        props.changeFilterCond("Active", props.todolistId)
    }

    const CompletedBtnOnClickHandler = () => {
        props.changeFilterCond("Completed", props.todolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <input value={inpValue}
                   onChange={inpOnChangeHandler}
                   onKeyDown={enterInpOnKeyDownHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={() => AddBtnOnClickHandler()}>+</button>
            {error && <div className="error-message">Title is required!</div>}
            <ul>
                {props.tasks.map((el) => {
                        const removeBtnOnClickHandler = () => {
                            props.removeTask(el.id, props.todolistId)
                        }
                        const statusInpOnChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
                            {
                                props.changeStatus(el.id, ev.currentTarget.checked, props.todolistId)
                            }
                        }
                        return (
                            <li key={el.id}
                                className={el.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={statusInpOnChangeHandler}
                                       checked={el.isDone}
                                />
                                <span>{el.title}</span>
                                <button onClick={removeBtnOnClickHandler}>X</button>
                            </li>
                        )
                    }
                )
                }
            </ul>
            <div>
                <button onClick={AllBtnOnClickHandler}
                        className={props.filterCond === "All" ? "active-filter" : ""}
                > All
                </button>
                <button onClick={ActiveBtnOnClickHandler}
                        className={props.filterCond === "Active" ? "active-filter" : ""}
                >Active
                </button>
                <button onClick={CompletedBtnOnClickHandler}
                        className={props.filterCond === "Completed" ? "active-filter" : ""}
                >Completed
                </button>
            </div>

        </div>
    )
}