import './styles/App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Feeds from './Pages/Feeds';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Feeds" element={<Feeds />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
