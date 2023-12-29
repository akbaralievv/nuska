import React, { useState } from 'react';

import icon from '../../../assets/icons/auth/password.svg';
import styles from './Password.module.css';

function Password({ setValueSignUp, setValidSignUp, errorValid }) {
  const [password, setPassword] = useState('');

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length > 8;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (validatePassword(value)) {
      setValueSignUp((prev) => ({ ...prev, password1: value }));
      setValidSignUp((prev) => ({ ...prev, password1: true }));
    } else {
      setValidSignUp((prev) => ({ ...prev, password1: false }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span>Password</span>
      </div>
      <input
        type="password"
        onChange={handleChange}
        className={errorValid ? styles.invalid : ''}
        value={password}
      />
      {errorValid && (
        <p className={styles.error}>
          Password must be at least 8 characters long and include uppercase, lowercase, number, and
          special character.
        </p>
      )}
    </div>
  );
}

export default Password;
