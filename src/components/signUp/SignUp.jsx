import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SignUp.module.css';

import Username from '../inputs/username/Username';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';
import { register } from '../../redux/slices/auth/register';
import { setRefreshToken } from '../helpers/tokens';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { data, loading, error } = useSelector((state) => state.register);
  useEffect(() => {
    if (data && data.message) {
      setModal(true);
    }
  }, [data]);
  const [modal, setModal] = useState(null);
  const [valueSignUp, setValueSignUp] = useState({
    phone: '+996771007644',
    first_name: '',
    last_name: '',
    password1: '',
    email: '',
  });
  const [validSignUp, setValidSignUp] = useState({
    phone: false,
    username: false,
    password1: false,
    email: false,
  });
  const [errorValid, setErrorValid] = useState({
    phone: false,
    username: false,
    password1: false,
    email: false,
  });
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();

  const isValid =
    valueSignUp.phone &&
    valueSignUp.first_name &&
    valueSignUp.last_name &&
    valueSignUp.password1 &&
    valueSignUp.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid && check) {
      console.log('Submitted:', valueSignUp);
      dispatch(register(valueSignUp));
    }
    if (!validSignUp.phone) {
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
  };

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };
  const navigate = useNavigate();
  const closeModal = () => {
    setModal(false);
    navigate('/');
  };
  useEffect(() => {
    setModal(false);
  }, []);
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h3>Катталуу</h3>
      <div className={styles.inputs}>
        <Username
          first_name={valueSignUp.first_name}
          last_name={valueSignUp.last_name}
          usernameValid={validSignUp.username}
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.username}
        />
        <Email
          email={valueSignUp.email}
          emailValid={validSignUp.email}
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.email}
        />
        <Password
          password1={valueSignUp.password1}
          password1Valid={validSignUp.password1}
          setValueSignUp={setValueSignUp}
          setValidSignUp={setValidSignUp}
          errorValid={errorValid.password1}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit">Катталуу</button>
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="checkbox" onChange={handleCheck} />
          <label htmlFor="checkbox">Соглашение об использовании приложения и купленных книг</label>
        </div>
      </div>
      {modal && (
        <div onClick={closeModal} className={styles.window}>
          <div onClick={(e) => e.stopPropagation()} className={styles.content}>
            {loading ? <p>loading...</p> : <h2>{data?.message}</h2>}
            <button onClick={closeModal} className={styles.closeBtn}>
              x
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default SignUp;
