import react, { useState, lazy, Suspense } from 'react'
import './App.css'
import Login from './components/Login.jsx'
import Tasks from './components/Tasks.jsx'
import Header from './components/Header.jsx'
import Register from './components/Register.jsx'
import Registered from './Registered.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginLazy = lazy(()=>import("./components/Login.jsx"));
const RegisterLazy = lazy(()=>import("./components/Register.jsx"));

function App() {
  const AutenthKey = ({children})=>{
             if(2>4){
                     return <Navigate to="/Nada"></Navigate>
             } else {return children}
  }

 /* const login = createBrowserRouter([
  {
    path: "/login",
    element: <AutenthKey><Suspense fallback="Loading"><Login></Login></Suspense></AutenthKey>,
    errorElement: <></>
  },
]);
  const tasks = createBrowserRouter([
  {
    path: "/tasks",
    element: <AutenthKey><Suspense fallback="Loading"><Tasks></Tasks></Suspense></AutenthKey>,
    errorElement: <></>
  },
]);
  const register = createBrowserRouter([
  {
    path: "/register",
    element: <AutenthKey><Suspense fallback="Loading"><RegisterLazy></RegisterLazy></Suspense></AutenthKey>,
    errorElement: <></>,
  },
]);
*/

  return (
    <>
    <Header></Header>
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />  {/* Exact path for Home */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Registered/:teamID" element={<Registered />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    {/*<RouterProvider router={login} />
    <RouterProvider router={tasks} />
    <RouterProvider router={register} />*/}
    </>
  )
}

export default App
