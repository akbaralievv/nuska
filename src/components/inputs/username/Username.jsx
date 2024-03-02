import React, { useState } from 'react';

import icon from '../../../assets/icons/auth/username.svg';
import styles from './Username.module.css';
import { useSelector } from 'react-redux';

function Username({ setValueSignUp, setValidSignUp, errorValid }) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const validateName = (name) => {
    const re = /^[a-zA-Zа-яА-Я-]+$/;
    return re.test(String(name));
  };

  const handleChange = (e) => {
    const value = e.target.value?.split(' ');
    if (value.length === 2 && validateName(value[0]) && validateName(value[1])) {
      setValueSignUp((prev) => ({ ...prev, last_name: value[0], first_name: value[1] }));
      setValidSignUp((prev) => ({ ...prev, username: true }));
    } else {
      setValidSignUp((prev) => ({ ...prev, username: false }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span style={currentThemeColor}>Аты-жөнү</span>
      </div>
      <input
        style={currentThemeColor}
        type="text"
        onChange={handleChange}
        className={errorValid ? styles.invalid : ''}
      />
      {errorValid && (
        <p className={styles.error}>Сураныч, жарактуу атын киргизиңиз (Фамилиясы Аты).</p>
      )}
    </div>
  );
}

export default Username;
