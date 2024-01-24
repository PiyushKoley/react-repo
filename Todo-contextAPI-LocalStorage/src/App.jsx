import { useEffect, useState } from "react";
import { TodoContextProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";


function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // in object todo that comes in parameter, only has title and toggleComplete..
    // and we are creating another object with id and rest every thing from todo object...
    // and all other elements from prev list are also as it is...

    setTodos(prev => [{id:Date.now(), ...todo}, ...prev]);
  }

  const updateTodo = (id,todo) => {

    setTodos(prevTodos => prevTodos.map( prevTodo => (prevTodo.id == id) ? todo :  prevTodo));
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(prevTodo => prevTodo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos(prevTodos => prevTodos.map(prevTodo => {
      if(prevTodo.id===id) {
        return {...prevTodo, completed : !prevTodo.completed}
      }
      return prevTodo;
    }));

    // setTodos(prevTodos => prevTodos.map(
    //   prevTodo => (prevTodo.id===id) ? { ...prevTodo, completed:!prevTodo.completed} : prevTodo
    // ));

  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length) {
      setTodos(todos);
    }
  } , []);

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos]);

  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map(todo => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
