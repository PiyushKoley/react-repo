import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {addTodo} from "../features/todo/todoSlice";

function AddTodo({ todoToUpdate, setTodoToUpdate }) {

    const [input, setInput] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        setInput(todoToUpdate?.text || "");
        setIsUpdating(todoToUpdate===null ? false : true)
        console.log(isUpdating);  
    }, [todoToUpdate]);      

    const addTodoHandler = (e) => {
        e.preventDefault();

        if(input.length === 0 || !input.trim()) {
            setInput("");
            alert("write some text");
            return;
        }

        dispatch(addTodo(input));
        setInput("");
        setTodoToUpdate(null);
    }

    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12 mb-8">
            <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button
            type="submit"
            className={`text-white ${isUpdating ?' bg-green-500 hover:bg-green-700' :  "bg-indigo-500 hover:bg-indigo-600"} border-0 py-2 px-6 focus:outline-none  rounded text-lg`}
            >
            {isUpdating ? "Update Todo" : "Add Todo"}
            </button>
        </form>
    )
}

export default AddTodo