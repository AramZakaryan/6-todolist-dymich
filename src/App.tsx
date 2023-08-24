import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type CondType = "All" | "Active" | "Completed"

type allTasksType = {
    [key: string]: TaskType[]
}

function App() {


    const removeTask = (removeTaskId: string, todolistId: string) => {

        let tasksFiltered =
            allTtasks[todolistId].filter(el =>
                el.id !== removeTaskId
            )

        setAllTasks({...allTtasks, [todolistId]: tasksFiltered})

    }

    const addTask = (newTaskTitle: string, todolistId: string) => {

        let newTask = {id: v1(), title: newTaskTitle, isDone: false}

        let TasksUpdated = [newTask, ...allTtasks[todolistId]]

        setAllTasks({...allTtasks, [todolistId]: TasksUpdated})
    }


    const changeTaskStatus = (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => {

        let taskTobeChanged = allTtasks[todolistId].find(el => el.id === changeTaskID)

        if (taskTobeChanged) {
            taskTobeChanged.isDone = changeTaskIsDone
            setAllTasks({...allTtasks})
        }
    }


    const changeTaskTitle = (todolistId: string, taskId: string, changedTaskTitle: string) => {
        let taskToBeUptaded = allTtasks[todolistId].find(el => el.id === taskId)

        if (taskToBeUptaded) {
            taskToBeUptaded.title = changedTaskTitle
            setAllTasks({...allTtasks})
        }

    }

    const changeFilterCond = (cond: CondType, todolistId: string) => {
        let todolist =
            todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filterCond = cond
            setTodolists([...todolists])
        }
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: todolistType = {id: newTodolistId, todolistTitle: title, filterCond: "All"}
        setTodolists([...todolists, newTodolist])

        setAllTasks({...allTtasks, [newTodolistId]: []})

    }

    const removeTodolist = (todolistId: string) => {

        let todolistsUpdated = todolists.filter(el => el.id !== todolistId)

        setTodolists(todolistsUpdated)

        delete allTtasks[todolistId]
        setAllTasks({...allTtasks})

    }

    const changeTodolistTitle =  (todolistId:string,changedTodolistTitle:string)=>{
        let todlolistUpdated = todolists.find(el=>el.id===todolistId)

        if (todlolistUpdated){
            todlolistUpdated.todolistTitle=changedTodolistTitle
            setTodolists([...todolists])
        }


    }

    type todolistType = {
        id: string
        todolistTitle: string
        filterCond: CondType
    }
    let todolistId1 = v1()


    let todolistId2 = v1()

    const [todolists, setTodolists] =
        useState<Array<todolistType>>(
            [
                {id: todolistId1, todolistTitle: "What to learn?", filterCond: "All"},
                {id: todolistId2, todolistTitle: "What to buy?", filterCond: "All"}
            ]
        )


    const [allTtasks, setAllTasks] =
        useState<allTasksType>({
            [todolistId1]: [
                {id: v1(), title: "CSS & HTML", isDone: false},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "Book", isDone: false},
                {id: v1(), title: "Milk", isDone: true},
            ],
        })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {

                    let filteredTasks: Array<TaskType>   // tasks to be shown (after filtration)

                    el.filterCond === "Active" ?
                        filteredTasks = allTtasks[el.id].filter(el => !el.isDone)
                        : el.filterCond === "Completed" ?
                            filteredTasks = allTtasks[el.id].filter(el => el.isDone)
                            : filteredTasks = allTtasks[el.id]

                    return (
                        <Todolist
                            key={el.id}
                            todolistId={el.id}
                            todolistTitle={el.todolistTitle}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilterCond={changeFilterCond}
                            addTask={addTask}
                            changeStatus={changeTaskStatus}
                            filterCond={el.filterCond}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                }
            )}
        </div>
    );
}


export default App;
