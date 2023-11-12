import { Route, Routes } from 'react-router-dom';
import './App.module.css';
import Main from './pages/main/Main';
import Layout from './components/hoc/Layout';
import Auth from './pages/auth/Auth';
import MyAccount from './pages/myAccount/MyAccount';
import Detail from './pages/detail/Detail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/detail" element={<Detail />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
