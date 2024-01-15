import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './LogIn.module.css';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';
import { authorization, clearDataLogin } from '../../redux/slices/auth/authorization';
import PreloadBtn from '../PreloadBtn/PreloadBtn';
import ModalWindow from '../modalWindow/ModalWindow';
import { setIsOpenModal } from '../../redux/slices/isTrue';

function LogIn() {
  const { data, loading, error } = useSelector((state) => state.authorization);
  const { isOpenModal } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [valueSignUp, setValueSignUp] = useState({
    password: '',
    email: '',
  });
  const [validSignUp, setValidSignUp] = useState({
    password: false,
    email: false,
  });
  const [errorValid, setErrorValid] = useState({
    password: false,
    email: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid =
    valueSignUp.password && valueSignUp.email && validSignUp.password && validSignUp.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(authorization(valueSignUp));
    }
    if (!validSignUp.password) {
      setErrorValid((prev) => ({ ...prev, password: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, password: false }));
    }
    if (!validSignUp.email) {
      setErrorValid((prev) => ({ ...prev, email: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, email: false }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setIsOpenModal(true));
    } else if (data) {
      dispatch(setIsOpenModal(true));
      navigate('/');
    }
  }, [data, error]);

  return (
    <div className={styles.wrapper}>
      <h3>Кирүү</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <Email
            setValueSignUp={setValueSignUp}
            setValidSignUp={setValidSignUp}
            errorValid={errorValid.email}
          />
          <Password
            valueSignUp={valueSignUp}
            setValueSignUp={setValueSignUp}
            setValidSignUp={setValidSignUp}
            errorValid={errorValid.password}
          />
        </div>
        <div className={styles.buttons}>
          <a href="" style={currentThemeColor}>
            Forgot password ?
          </a>
          <button type="submit" style={currentThemeColor} disabled={loading}>
            {loading ? <PreloadBtn /> : 'Кирүү'}
          </button>
        </div>
        {isOpenModal && <ModalWindow message={error ? error : data} />}
      </form>
    </div>
  );
}

export default LogIn;
