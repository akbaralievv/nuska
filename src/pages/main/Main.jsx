import React, { useEffect } from 'react';

import styles from './Main.module.css';

import GenreFilters from '../../components/genreFilters/GenreFilters';
import BookLists from '../../components/bookLists/BookLists';
import Header from '../../components/header/Header';
import { setIsOpenModal } from '../../redux/slices/isTrue';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataRegister } from '../../redux/slices/auth/register';
import { clearDataLogin } from '../../redux/slices/auth/authorization';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {
  const {
    data: registerData,
    loading: registerLoading,
    error: registerError,
  } = useSelector((state) => state.register);

  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = useSelector((state) => state.authorization);

  const { isOpenModal } = useSelector((state) => state.isTrue);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Header />
          <GenreFilters />
          <BookLists />
        </div>
      </div>
      {isOpenModal && (
        <ModalWindow
          message={registerData.message || registerError || loginData || loginError || ''}
        />
      )}
    </div>
  );
}

export default Main;
