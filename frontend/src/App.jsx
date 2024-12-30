import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AcademicHub from './pages/AcademicHub';
import CampusCommunity from './pages/CampusCommunity';
import PlatformSupport from './pages/PlatformSupport';
import CreatePost from './pages/CreatePost';

function App() {
  const [login, setLogin] = useState(false);

  return (
    login ? (
      <Router>
        <Layout login={login}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLogin={setLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/academic-hub" element={<AcademicHub />} />
            <Route path="/post/campus-community" element={<CampusCommunity />} />
            <Route path="/post/platform-support" element={<PlatformSupport />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </Layout>
      </Router>
    ) : (
      <Router>
        <Layout login={login}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLogin={setLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/academic-hub" element={<AcademicHub />} />
            <Route path="/post/campus-community" element={<CampusCommunity />} />
            <Route path="/post/platform-support" element={<PlatformSupport />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </Layout>
      </Router>
    )
  );
}

export default App;