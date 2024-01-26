import { useState } from "react"
import { AddTodo, Todo } from "./components"

function App() {

  const [todoToUpdate, setTodoToUpdate] = useState(null);

  console.log(todoToUpdate,"**** in app.jsxx *****");

  return (
    <>
      <div className="text-3xl text-center w-full bg-zinc-900 h-screen p-10">
        <AddTodo todoToUpdate={todoToUpdate} setTodoToUpdate={setTodoToUpdate}/>
        <Todo setTodoToUpdate={setTodoToUpdate} />
      </div>
    </>
  )
}

export default App
