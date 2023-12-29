import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './LogIn.module.css';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';
import { authorization } from '../../redux/slices/auth/authorization';

function LogIn() {
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

  const isValid = valueSignUp.password && valueSignUp.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      console.log('Submitted:', valueSignUp);
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

  return (
    <div className={styles.wrapper}>
      <h3>КирYY</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <Email
            email={valueSignUp.email}
            emailValid={validSignUp.email}
            setValueSignUp={setValueSignUp}
            setValidSignUp={setValidSignUp}
            errorValid={errorValid.email}
          />
          <Password
            password={valueSignUp.password}
            passwordValid={validSignUp.password}
            setValueSignUp={setValueSignUp}
            setValidSignUp={setValidSignUp}
            errorValid={errorValid.password}
          />
        </div>
        <div className={styles.buttons}>
          <a href="">Forgot password ?</a>
          <button type="submit">КирYY</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
