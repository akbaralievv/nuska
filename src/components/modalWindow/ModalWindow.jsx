import React from 'react';
import { setIsOpenModal } from '../../redux/slices/isTrue';

import styles from './ModalWindow.module.css';
import { useDispatch } from 'react-redux';
import { clearDataRegister } from '../../redux/slices/auth/register';
import { clearDataLogin } from '../../redux/slices/auth/authorization';

function ModalWindow({ message }) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsOpenModal(false));
    dispatch(clearDataRegister());
    dispatch(clearDataLogin());
  };
  return (
    <div onClick={closeModal} className={styles.window}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <h2>{message}</h2>
        <button onClick={closeModal} className={styles.closeBtn}>
          x
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;
