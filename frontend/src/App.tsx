import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AcademicHub from './pages/AcademicHub';
import CampusCommunity from './pages/CampusCommunity';
import PlatformSupport from './pages/PlatformSupport';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/academic-hub" element={<AcademicHub />} />
          <Route path="/campus-community" element={<CampusCommunity />} />
          <Route path="/platform-support" element={<PlatformSupport />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;