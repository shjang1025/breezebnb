import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import AddRoomForm from './components/HostForm/addRoomForm';
import BnbMain from './components/Listings/BnbMain';
import ListingsShow from './components/Listings/ListingsShow';

const router = createBrowserRouter([
  { path: '/', element: <BnbMain/> },
  { path: '/host', element: <AddRoomForm/> },
  { path: '/listings/:room_id', element: <ListingsShow/>}
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
