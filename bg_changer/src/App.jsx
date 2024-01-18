
import { useState } from "react"

function App() {
  const [color, setColor] = useState("olive");
  return (
    <div className="w-full h-screen duration-500"
    style={{backgroundColor: color}}
    >
      <div className="fixed  flex flex-wrap justify-center bottom-12 inset-x-0 px-2"> 
        <div className = "flex flex-wrap justify-center gap-3 shadow-2xl px-3 py-2 bg-white rounded-3xl">
          <button className="utline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:'coral'}} onClick={()=> setColor("coral")}>coral</button>
          <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:'lightgreen'}} onClick={()=> setColor("lightgreen")}>Light Green</button>
          <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:'Blue'}} onClick={()=> setColor("Blue")}>Blue</button>
          <button className="outline-none px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor:'Yellow'}} onClick={()=> setColor("Yellow")}>Yellow</button>
          <button className="outline outline-1 outline-gray-300  px-4 py-1 rounded-full text-black shadow-lg" style={{backgroundColor:'White'}} onClick={()=> setColor("White")}>White</button>
          <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:'orange'}} onClick={()=> setColor("orange")}>Orange</button>
          <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:'lightblue'}} onClick={()=> setColor("lightblue")}>Light Blue</button>
        </div>
      </div>
    </div>
  )
}

export default App
