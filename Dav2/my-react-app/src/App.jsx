import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddPackage from './pages/AddPackage';  // <-- Add this import
import AddDestination from './pages/AddDestination';
import ViewPackages from './pages/ViewPackages';
import ViewUsers from './pages/ViewUsers';
import ViewBookings from './pages/ViewBookings';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-package" element={<AddPackage />} />  {/* Now properly defined */}
        <Route path="view-package" element={<ViewPackages />} />
        <Route path="add-destination" element={<AddDestination />} />
        <Route path="view-subscriber" element={<ViewUsers />} />
        <Route path="view-bookings" element={<ViewBookings />} />

      </Route>
      
    </Routes>
    
  );
}

export default App;