
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import Gallery from './pages/Gallery';
import ScriptMaker from './pages/ScriptMaker';
import PlaylistManager from './pages/PlaylistManager';
import ActionSchedule from './pages/ActionSchedule';
import HistoryStream from './pages/HistoryStream';
import Logs from './pages/Logs';
import Profile from './pages/Profile';
import InstallationGuide from './pages/InstallationGuide';
import Login from './pages/Login';

const App: React.FC = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Navigate to={isAuth ? "/overview" : "/login"} replace />} />
        <Route path="/overview" element={isAuth ? <Overview /> : <Navigate to="/login" />} />
        <Route path="/gallery" element={isAuth ? <Gallery /> : <Navigate to="/login" />} />
        <Route path="/script-maker" element={isAuth ? <ScriptMaker /> : <Navigate to="/login" />} />
        <Route path="/playlist" element={isAuth ? <PlaylistManager /> : <Navigate to="/login" />} />
        <Route path="/schedule" element={isAuth ? <ActionSchedule /> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuth ? <HistoryStream /> : <Navigate to="/login" />} />
        <Route path="/logs" element={isAuth ? <Logs /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/guide" element={isAuth ? <InstallationGuide /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
