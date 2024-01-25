import React, { useEffect, useState } from 'react';
import {
  clearDataforgoutPassword,
  forgoutPassword,
  setEmail,
} from '../../redux/slices/auth/forgoutPassword';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ChangePassword.module.css';
import PreloadBtn from '../PreloadBtn/PreloadBtn';
import {
  setIsChangePassword,
  setIsConfirmCode,
  setIsForgoutPassword,
  setIsOpenModal,
} from '../../redux/slices/isTrue';
import ModalWindow from '../modalWindow/ModalWindow';
import Password from '../inputs/password/Password';
import { postNewPassword } from '../../redux/slices/auth/changePassword';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const { data, loading, error } = useSelector((state) => state.forgoutPassword);
  const { isOpenModal, isConfirmCode } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [newPassword, setNewPassword] = useState({
    new_password: '',
  });
  const [validNewPassword, setValidNewPassword] = useState({
    new_password: false,
  });
  const [errorValidNewPassword, setErrorValidNewPassword] = useState({
    new_password: false,
  });

  const isValid = newPassword.new_password && validNewPassword.new_password;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(postNewPassword(newPassword));
      setErrorValidNewPassword((prev) => ({ ...prev, new_password: false }));
    } else {
      setErrorValidNewPassword((prev) => ({ ...prev, new_password: true }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setIsOpenModal(true));
      dispatch(setIsChangePassword(false));
      dispatch(setIsConfirmCode(true));
    } else if (data) {
      dispatch(setIsOpenModal(true));
      dispatch(setIsChangePassword(false));
      navigate('/');
    }
  }, [data, error]);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Password
          valueSignUp={newPassword}
          setValueSignUp={setNewPassword}
          setValidSignUp={setValidNewPassword}
          errorValid={errorValidNewPassword.new_password}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit" style={currentThemeColor} disabled={loading}>
          {loading ? <PreloadBtn /> : 'Кодду алуу'}
        </button>
      </div>
      {isOpenModal && <ModalWindow message={error ? error : 'Сиз ийгиликтуу кирдиниз'} />}
    </form>
  );
}

export default ChangePassword;
