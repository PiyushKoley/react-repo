import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      }
      else {
        dispatch(logout())
      }
    })
    .catch((error) => console.log("*** error in app.jsx***",error))
    .finally(() => {setLoading(false)});

  }, []);

  return loading ? "loading" : (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet/>
          </main>
          <Footer />
        </div>
      </div>  
    </>
  )
}

export default App
