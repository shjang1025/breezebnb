import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import AddRoomForm from './components/HostForm/addRoomForm';

const router = createBrowserRouter([
  { path: '/', element: <Navbar /> },
  { path: '/host', element: <AddRoomForm /> }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
