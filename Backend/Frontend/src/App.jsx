import React from 'react'
import Left from './Home/left/left'
import Right from './Home/right/right'
import Logout from './Home/left1/Logout'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './context/AuthProvider'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Loading from './components/loading'
import toast, { Toaster } from 'react-hot-toast'


const App = () => {
  const { authUser, setAuthUser } = useAuth();
  console.log(authUser);
  // const Navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={authUser ?
          (<div className='flex h-screen'>

            <Logout></Logout>
            <Left></Left>
            <Right></Right>
          </div>) : (
            <Navigate to={"/login"} />

          )
        } />
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup />} />

      </Routes>
      <Toaster />
      {/* <Loading /> */}
    </>

    // <div>

    // <div className='flex h-screen'>

    //   <Logout></Logout>
    //   <Left></Left>
    //   <Right></Right>
    // </div>
    //   {/* <Signup /> */}
    //   {/* <Login /> */}

    // </div>
  )
}

export default App