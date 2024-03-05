import React, { useEffect, useState } from 'react';
import { forgoutPassword } from '../../redux/slices/auth/forgoutPassword';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ConfirmCode.module.css';
import PreloadBtn from '../PreloadBtn/PreloadBtn';
import {
  setIsChangePassword,
  setIsConfirmCode,
  setIsForgoutPassword,
  setIsOpenModal,
} from '../../redux/slices/isTrue';
import ModalWindow from '../modalWindow/ModalWindow';
import Code from '../inputs/code/Code';
import { useNavigate } from 'react-router-dom';
import { clearDataCodeConfirm, codeConfirm } from '../../redux/slices/auth/codeConfirm';

function ConfirmCode() {
  const { data, loading, error } = useSelector((state) => state.codeConfirm);
  const { email } = useSelector((state) => state.forgoutPassword);
  const { isOpenModal } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [confirmCode, setConfirmCode] = useState({
    code: '',
    email: email,
  });
  const [validConfirmCode, setValidConfirmCode] = useState({
    code: false,
  });
  const [errorValidConfirmCode, setErrorValidConfirmCode] = useState({
    code: false,
  });

  const isValid = confirmCode.code && validConfirmCode.code;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(codeConfirm(confirmCode));
      setErrorValidConfirmCode((prev) => ({ ...prev, code: false }));
    } else {
      setErrorValidConfirmCode((prev) => ({ ...prev, code: true }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setIsOpenModal(true));
    } else if (data) {
      // dispatch(setIsOpenModal(true));
      dispatch(setIsConfirmCode(false));
      dispatch(setIsChangePassword(true));
      // navigate('/');
    }
  }, [data, error]);

  useEffect(() => {
    return () => dispatch(clearDataCodeConfirm());
  }, []);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Code
          setValueSignUp={setConfirmCode}
          setValidSignUp={setValidConfirmCode}
          errorValid={errorValidConfirmCode.code}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit" style={currentThemeColor} disabled={loading}>
          {loading ? <PreloadBtn /> : 'Кодду текшерүү'}
        </button>
      </div>
      {isOpenModal && <ModalWindow message={error ? error : 'Сиз ийгиликтуу кирдиниз'} />}
    </form>
  );
}

export default ConfirmCode;
