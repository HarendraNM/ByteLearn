import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Courses from './pages/Courses'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Admin from './pages/admin/Admin'
import Dashboard from './pages/admin/Dashboard'
import Course from './pages/admin/Course'
import CreateCourse from './pages/admin/CreateCourse'
import UpdateCourse from './pages/admin/UpdateCourse'
import CreateLecture from './pages/admin/CreateLecture'
import UpdateLecture from './pages/admin/UpdateLecture'

const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },
  {
    path:'/courses',
    element:<><Navbar/><Courses/></>
  },
  {
    path:'/login',
    element:<><Navbar/><Login/></>
  },
  {
    path:'/signup',
    element:<><Navbar/><Signup/></>
  },
  {
    path:'/profile',
    element:<><Navbar/><Profile/></>
  },
  {
    path:'/admin',
    element:<><Navbar/><Admin/></>,
    children:[
      {
        path:'dashboard',
        element:<Dashboard/>
      },
      {
        path:'courses',
        element:<Course/>
      },
      {
        path:'courses/create',
        element:<CreateCourse/>
      },
      {
        path:'courses/:courseId',
        element:<UpdateCourse/>
      },
      {
        path:'courses/:courseId/lectures',
        element:<CreateLecture/>
      },
      {
        path:'courses/:courseId/lectures/:lectureId',
        element:<UpdateLecture/>
      }
    ]
  }
])


const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  )
}

export default App
