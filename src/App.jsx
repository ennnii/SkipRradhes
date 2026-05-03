import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientPage from './pages/ClientPage';
import BusinessPage from './pages/BusinessPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<ClientPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/login"    element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;