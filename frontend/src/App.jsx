import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navbar/>
//   },
//   {
//     path: '/login',
//     element: <SessionForm formType="login" />
//   },
//   {
//     path: '/signup',
//     element: <SessionForm formType="signup" />
//   },
//   {
//     path: '/users',
//     element: <AllUsers />
//   },
//   {
//     path: '/users/new',
//     element: <CreateUser />
//   }
// ])

const router = createBrowserRouter([
  {path: '/', element: <Navbar/>}
]);
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
