import React, { useEffect, useState } from 'react';
import {
  clearDataforgoutPassword,
  forgoutPassword,
  setEmail,
} from '../../redux/slices/auth/forgoutPassword';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ForgoutPassword.module.css';
import PreloadBtn from '../PreloadBtn/PreloadBtn';
import { setIsConfirmCode, setIsForgoutPassword, setIsOpenModal } from '../../redux/slices/isTrue';
import ModalWindow from '../modalWindow/ModalWindow';
import Email from '../inputs/email/Email';

function ForgoutPassword() {
  const { data, loading, error } = useSelector((state) => state.forgoutPassword);
  const { isOpenModal, isConfirmCode } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [forgoutEmail, setForgoutEmail] = useState({
    email: '',
  });
  const [validForgoutEmail, setValidForgoutEmail] = useState({
    email: false,
  });
  const [errorValidForgoutEmail, setErrorValidForgoutEmail] = useState({
    email: false,
  });

  const isValid = forgoutEmail.email && validForgoutEmail.email;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(forgoutPassword(forgoutEmail));
      setErrorValidForgoutEmail((prev) => ({ ...prev, email: false }));
    } else {
      setErrorValidForgoutEmail((prev) => ({ ...prev, email: true }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setIsOpenModal(true));
      dispatch(setIsConfirmCode(false));
      dispatch(setIsForgoutPassword(true));
    } else if (data) {
      dispatch(setEmail(forgoutEmail.email));
      dispatch(setIsOpenModal(false));
      dispatch(setIsConfirmCode(true));
      dispatch(setIsForgoutPassword(false));
    }
  }, [data, error]);

  useEffect(() => {
    return () => dispatch(clearDataforgoutPassword());
  }, []);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Email
          setValueSignUp={setForgoutEmail}
          setValidSignUp={setValidForgoutEmail}
          errorValid={errorValidForgoutEmail.email}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit" style={currentThemeColor} disabled={loading}>
          {loading ? <PreloadBtn /> : 'Кодду алуу'}
        </button>
      </div>
      {isOpenModal && <ModalWindow message={error} />}
    </form>
  );
}

export default ForgoutPassword;
