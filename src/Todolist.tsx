import React, {ChangeEvent} from "react";
import {CondType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (removeTaskId: string, todolistId: string) => void
    changeFilterCond: (cond: CondType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filterCond: CondType
    changeTaskTitle: (todollistId:string, taskId:string, changedTaskTitle:string)=>void
    changeTodolistTitle: (todollistId:string,changedTodolistTitle:string)=>void
}


export function Todolist(props: TodolistPropsType) {

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

    const addTaskIntermediary = (newTaskTitle: string) =>
        props.addTask(newTaskTitle, props.todolistId)


    const changeTodolistTitleIntermediary = (todolistTitle:string)=>{
        props.changeTodolistTitle(props.todolistId,todolistTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan updatedTitle={props.todolistTitle} changeSpanContent={changeTodolistTitleIntermediary}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <AddItemForm addItem={addTaskIntermediary}/>

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

                    const changeTaskTitleIntermediary =(changedTaskTitle:string) =>{
                        props.changeTaskTitle(props.todolistId, el.id, changedTaskTitle)
                    }

                        return (
                            <li key={el.id}
                                className={el.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={statusInpOnChangeHandler}
                                       checked={el.isDone}
                                />

                                <EditableSpan updatedTitle={el.title} changeSpanContent={changeTaskTitleIntermediary}/>

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

