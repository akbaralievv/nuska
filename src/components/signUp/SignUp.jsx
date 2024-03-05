import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './SignUp.module.css';

import Username from '../inputs/username/Username';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';
import { clearDataRegister, register } from '../../redux/slices/auth/register';
import { setRefreshToken } from '../helpers/tokens';
import ModalWindow from '../modalWindow/ModalWindow';
import {
  setIsAuth,
  setIsCheckPublicOffer,
  setIsOpenModal,
  setIsOpenModalPublicOffer,
} from '../../redux/slices/isTrue';
import PreloadBtn from '../PreloadBtn/PreloadBtn';
import ModalPublicOffer from '../modalPublicOffer/ModalPublicOffer';
import { getPublicOffers } from '../../redux/slices/getPublicOffers';

function SignUp() {
  const { data, loading, error } = useSelector((state) => state.register);
  const { isOpenModal, isCheckPublicOffer, isOpenModalPublicOffer } = useSelector(
    (state) => state.isTrue,
  );
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: publicOffersData } = useSelector((state) => state.getPublicOffers);

  const [valueSignUp, setValueSignUp] = useState({
    phone: '+996771007644',
    first_name: '',
    last_name: '',
    password1: '',
    email: '',
  });
  const [validSignUp, setValidSignUp] = useState({
    username: false,
    password1: false,
    email: false,
  });
  const [errorValid, setErrorValid] = useState({
    username: false,
    password1: false,
    email: false,
    checkbox: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const public_offer = publicOffersData?.find((info) => info.title === 'public_offer');

  const isValid =
    valueSignUp.first_name &&
    valueSignUp.last_name &&
    valueSignUp.password1 &&
    valueSignUp.email &&
    validSignUp.username &&
    validSignUp.password1 &&
    validSignUp.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid && isCheckPublicOffer) {
      dispatch(register(valueSignUp));
    } else if (!validSignUp.phone) {
      setErrorValid((prev) => ({ ...prev, phone: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, phone: false }));
    }
    if (!validSignUp.username) {
      setErrorValid((prev) => ({ ...prev, username: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, username: false }));
    }
    if (!validSignUp.password1) {
      setErrorValid((prev) => ({ ...prev, password1: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, password1: false }));
    }
    if (!validSignUp.email) {
      setErrorValid((prev) => ({ ...prev, email: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, email: false }));
    }
    if (!isCheckPublicOffer) {
      setErrorValid((prev) => ({ ...prev, checkbox: true }));
    } else {
      setErrorValid((prev) => ({ ...prev, checkbox: false }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setIsOpenModal(true));
    } else if (data && data.message) {
      dispatch(setIsOpenModal(true));
      return navigate('/');
    }
  }, [data, error]);

  useEffect(() => {
    return () => dispatch(setIsCheckPublicOffer(false));
  }, []);

  const openModalPublicOffer = () => {
    dispatch(getPublicOffers());
    dispatch(setIsOpenModalPublicOffer(true));
    document.body.style.overflow = 'hidden';
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {isOpenModalPublicOffer && <ModalPublicOffer text={public_offer?.content} isCheck={true} />}
      <h3>Катталуу</h3>
      <div className={styles.inputs}>
        <Username
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.username}
        />
        <Email
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.email}
        />
        <Password
          valueSignUp={valueSignUp}
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.password1}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit" style={currentThemeColor} disabled={loading}>
          {loading ? <PreloadBtn /> : 'Катталуу'}
        </button>
        <a
          className={`${styles.forgout} ${key === 'light' ? styles.light : styles.dark}`}
          style={currentThemeColor}
          onClick={() => dispatch(setIsAuth(true))}>
          Сиздин аккаунтуңуз барбы? Кирүү
        </a>
        <div>
          <div className={styles.checkbox}>
            <p style={currentThemeColor} onClick={openModalPublicOffer}>
              Тиркемени колдонуу боюнча келишим
            </p>
          </div>
          {errorValid.checkbox && (
            <p className={styles.errorCheckbox}>Сураныч, келишимди окуп чыгыңыз.</p>
          )}
        </div>
      </div>
      {isOpenModal && <ModalWindow message={data.message ?? error} />}
    </form>
  );
}

export default SignUp;
