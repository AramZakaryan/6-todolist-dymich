import React, {useState} from "react";

export type AddItemFormProps = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormProps> = (props) => {

    const [inpValue,
        setInpValue]
        = useState("")

    const [error,
        setError]
        = useState(false)

    const inpOnChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(ev.currentTarget.value)
        setError(false)
    }

    const enterInpOnKeyDownHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.code === "Enter" && inpValue.trim() !== "") {
            props.addItem(inpValue)
            setInpValue("")
        } else {
            setError(true)
        }
    }

    const AddBtnOnClickHandler = () => {
        if (inpValue.trim() !== "") {
            props.addItem(inpValue)
            setInpValue("")
        } else {
            setError(true)
        }
    }

    return (<div>
        <input value={inpValue}
               onChange={inpOnChangeHandler}
               onKeyDown={enterInpOnKeyDownHandler}
               className={error ? "error" : ""}
        />
        <button onClick={() => AddBtnOnClickHandler()}>+</button>
        {error && <div className="error-message">Title is required!</div>}
    </div>)
}