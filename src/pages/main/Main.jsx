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

  const {
    data: codeData,
    loading: codeLoading,
    error: codeError,
  } = useSelector((state) => state.codeConfirm);

  const { isOpenModal, isLogout } = useSelector((state) => state.isTrue);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    // return () => {
    //   dispatch(setIsOpenModal(false));
    //   document.body.style.overflow = '';
    // };
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
      {isLogout && <ModalWindow message={'Сиз аккаунтуңуздан ийгиликтүү чыктыңыз'} />}
      {isOpenModal && (
        <ModalWindow
          message={
            registerData.message ||
            registerError ||
            loginData ||
            loginError ||
            codeData ||
            codeError ||
            ''
          }
        />
      )}
    </div>
  );
}

export default Main;
