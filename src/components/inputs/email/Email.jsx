import React, { useState } from 'react';

import icon from '../../../assets/icons/auth/email.svg';
import styles from './Email.module.css';

function Email({ setValueSignUp, setValidSignUp, errorValid }) {
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value && validateEmail(value)) {
      setValueSignUp((prev) => ({ ...prev, email: value }));
      setValidSignUp((prev) => ({ ...prev, email: true }));
    } else {
      setValidSignUp((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span>Email address</span>
      </div>
      <input type="text" onChange={handleChange} className={errorValid ? styles.invalid : ''} />
      {errorValid && <p className={styles.error}>Please enter a valid email address.</p>}
    </div>
  );
}

export default Email;
