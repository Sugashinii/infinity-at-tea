import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import KitDetails from './pages/KitDetails';

function App() {
  return (
    <div className="min-h-screen bg-tea-50 font-sans text-tea-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kit/:id" element={<KitDetails />} />
      </Routes>
    </div>
  );
}

export default App;
