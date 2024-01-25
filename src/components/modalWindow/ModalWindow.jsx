import React from 'react';
import { setIsLogout, setIsOpenModal } from '../../redux/slices/isTrue';

import styles from './ModalWindow.module.css';
import { useDispatch } from 'react-redux';
import { clearDataRegister } from '../../redux/slices/auth/register';
import { clearDataLogin } from '../../redux/slices/auth/authorization';
import { useNavigate } from 'react-router-dom';

function ModalWindow({ message, elementBtn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    if (!elementBtn) {
      dispatch(setIsOpenModal(false));
      dispatch(clearDataRegister());
      dispatch(clearDataLogin());
      document.body.style.overflow = '';
      dispatch(setIsLogout(false));
    }
  };

  const handleClickAuthBtn = () => {
    navigate('/auth');
    dispatch(setIsOpenModal(false));
    dispatch(clearDataRegister());
    dispatch(clearDataLogin());
    document.body.style.overflow = '';
    dispatch(setIsLogout(false));
  };

  return (
    <div onClick={closeModal} className={styles.window}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <h2>{message}</h2>
        <button onClick={closeModal} className={styles.closeBtn}>
          x
        </button>
        {elementBtn && (
          <button className={styles.authBtn} onClick={handleClickAuthBtn}>
            Кирүү
          </button>
        )}
      </div>
    </div>
  );
}

export default ModalWindow;
