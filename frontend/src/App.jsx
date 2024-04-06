import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import AddRoomForm from './components/HostForm/addRoomForm';
import BnbMain from './components/BnbMain';

const router = createBrowserRouter([
  { path: '/', element: <BnbMain/> },
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
