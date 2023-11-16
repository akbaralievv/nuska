import { Route, Routes } from 'react-router-dom';
import './App.module.css';
import Main from './pages/main/Main';
import Layout from './components/hoc/Layout';
import Auth from './pages/auth/Auth';
import MyAccount from './pages/myAccount/MyAccount';
import Detail from './pages/detail/Detail';
import Inside from './pages/inside/Inside';
import MyBooks from './pages/myBooks/MyBooks';
import MyWishlist from './pages/myWishlist/MyWishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/myBooks" element={<MyBooks />} />
        <Route path="/myWishlist" element={<MyWishlist />} />
      </Route>
      <Route path="/inside" element={<Inside />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
