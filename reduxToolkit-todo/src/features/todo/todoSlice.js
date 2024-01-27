import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos : [{id : 1, text : "Hello World"}],
    isUpdating : false,
    todoToUpdate : null
}

const todoSlice = createSlice({
    name : "todo",// this property (name) is predefined in reduxToolkit...
    initialState : initialState,
    reducers : { // in reducers we will give functionality to modify any thing in state...
        addTodo : (state, action) => {   // in every reducer function redux will pass 'state' and 'action' for accessing the data .... 
            const todo = {
                id: nanoid(),    // for 'id' we are auto assigning it from 'nanoid' function from redux toolkit . NOT NEEDED IF DATA(payload = {id:1,text:"some text"}) IS ALREADY HAVING ID PROPERTY...
                text : action.payload // in 'action' we have 'payload' from that we can extract any property of our data .....
            }

            state.todos.push(todo); // 'state' is holding current state of data...
        },
        removeTodo : (state, action) => {
            const id = action.payload;

            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        updateTodo : (state, action) => {
            const id = action.payload.id;
            const text = action.payload.text;
            state.todos = state.todos.map(todo => (todo.id === id) ? {...todo, text: text} : todo);
        },
        setTodoToUpdate : (state, action) => {
            state.todoToUpdate = action.payload;
            state.isUpdating = true;
        },
        removeTodoToUpdate : (state, action) => {
            state.isUpdating  = false;
            state.todoToUpdate = null;
        }
    }
})


// we have to export individual reducers , so that we can use in any component and any where...
export const { updateTodo, addTodo, removeTodo, setTodoToUpdate, removeTodoToUpdate } = todoSlice.actions;

// we have to export whole reducer/slice , so that we can register this reducer/slice in redux 'store'...
export const todoReducer = todoSlice.reducer