import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Home,About,Contact,User, GitHub} from './components/index.js'

import { getGithubUserInfo } from './components/Github/Github.jsx'
// const router1 = createBrowserRouter([
//   {
//     path:"/",
//     element: <App />,
//     children : [
//       {
//         path:"",
//         element:<Home />
//       },
//       {
//         path: "about",
//         element:<About />
//       },
//       {
//         path: "contact",
//         element:<Contact />
//       }
//     ]
//   }
// ])

// ******************* this is another way to write the route apart from above *******************

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />} >
      <Route path='' element = {<Home/>} />
      <Route path='contact' element = {<Contact/>} />
      <Route path='about' element = {<About/>} />
      <Route path='user/:userId' element = {<User />} />
      <Route 
        path='github' 
        element = {<GitHub />} 
        loader={getGithubUserInfo}
      />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
