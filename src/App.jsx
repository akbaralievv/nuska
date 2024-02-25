import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import './App.module.css';
import './App.css';
import 'react-credit-cards/es/styles-compiled.css';

import Main from './pages/main/Main';
import Layout from './components/hoc/Layout';
import Auth from './pages/auth/Auth';
import MyAccount from './pages/myAccount/MyAccount';
import Detail from './pages/detail/Detail';
import Inside from './pages/inside/Inside';
import MyBooks from './pages/myBooks/MyBooks';
import MyWishlist from './pages/myWishlist/MyWishlist';
import PaymentForm from './pages/payment/Payment';
import AuthorBooks from './pages/authorBooks/AuthorBooks';
import AuthorDetail from './pages/authorDetail/AuthorDetail';

function App() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  function setBodyClass() {
    const body = document.querySelector('body');
    if (key === 'light') {
      body.style.background = '#DDD';
      body.style.color = '#000';
    } else if (key === 'dark') {
      body.style.background = '#171717';
      body.style.color = '#FFF';
    }
  }

  useEffect(() => {
    setBodyClass();
  }, [key]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/authorDetail/:id" element={<AuthorDetail />} />
        <Route path="/myBooks" element={<MyBooks />} />
        <Route path="/myWishlist" element={<MyWishlist />} />
        <Route path="/authorBooks" element={<AuthorBooks />} />
        <Route path="/myBooks/payment" element={<PaymentForm />} />
        <Route path="/myAccount" element={<MyAccount />} />
      </Route>
      <Route path="/inside" element={<Inside />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
