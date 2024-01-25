import { AddTodo, Todo } from "./components"

function App() {

  return (
    <>
      <div className="text-3xl text-center w-full bg-zinc-900 h-screen p-10">
        <AddTodo />
        <Todo />
      </div>
    </>
  )
}

export default App
