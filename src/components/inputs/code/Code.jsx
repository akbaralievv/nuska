import React, { useState } from 'react';

import icon from '../../../assets/icons/auth/code.png';
import styles from './Code.module.css';
import { useSelector } from 'react-redux';

function Code({ setValueSignUp, setValidSignUp, errorValid }) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const validateCode = (name) => {
    const re = /^\d+$/;
    return re.test(String(name));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length === 6 && validateCode(value)) {
      setValueSignUp((prev) => ({ ...prev, code: value }));
      setValidSignUp((prev) => ({ ...prev, code: true }));
    } else {
      setValidSignUp((prev) => ({ ...prev, code: false }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span style={currentThemeColor}>Code</span>
      </div>
      <input
        style={currentThemeColor}
        type="text"
        onChange={handleChange}
        className={errorValid ? styles.invalid : ''}
      />
      {errorValid && (
        <p className={styles.error}>Please enter a valid code (six digit number only).</p>
      )}
    </div>
  );
}

export default Code;
