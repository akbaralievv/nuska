import { Route, Routes } from 'react-router-dom';
import './App.module.css';
import Main from './pages/main/Main';
import Layout from './components/hoc/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
