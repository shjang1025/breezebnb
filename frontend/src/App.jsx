import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import AddRoomForm from './components/HostForm/addRoomForm';
import BnbMain from './components/Listings/BnbMain';
import ListingsShow from './components/Listings/ListingsShow';
import Trip from './components/Trips/Trip';
import EditHostForm from './components/HostForm/EditHostForm';

const router = createBrowserRouter([
  { path: '/', element: <BnbMain/> },
  { path: '/host', element: <AddRoomForm mode='create'/> },
  { path: 'users/:user_id/host/edit/:host_id', element: <EditHostForm/> },
  { path: '/listings/:room_id', element: <ListingsShow/>},
  { path: '/users/:user_id', element: <Trip/>}
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
