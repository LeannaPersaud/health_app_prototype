import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Medication from "./pages/Medication";
import DoandDont from './pages/DoandDont';
import Calendar from './pages/Calendar';
import Schedule from './pages/ScheduleRefill';
import { useState, useEffect } from 'react';

function App() {
  const [highContrast, setHighContrast] = useState(false);

  function toggleContrast(){
    setHighContrast(prev => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("contrast", highContrast);
  }, [highContrast]);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home contrast={highContrast} toggleContrast={toggleContrast} />} />
        <Route path="/Medication" element={<Medication contrast={highContrast} toggleContrast={toggleContrast} />} />
        <Route path="/Calendar" element={<Calendar contrast={highContrast} toggleContrast={toggleContrast} />} />
        <Route path="/DoandDont" element={<DoandDont contrast={highContrast} toggleContrast={toggleContrast} />} />
        <Route path="/Schedule" element={<Schedule contrast={highContrast} toggleContrast={toggleContrast} />} />
      </Routes>
    </div>
  )
}

export default App
