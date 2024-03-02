import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import icon from '../../../assets/icons/auth/password.svg';
import eyeHide from '../../../assets/icons/auth/hide.png';
import eyeShow from '../../../assets/icons/auth/view.png';
import styles from './Password.module.css';

function Password({ setValueSignUp, setValidSignUp, errorValid, valueSignUp }) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState(true);

  const validatePassword = (password) => {
    return password.length > 8;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if ('password1' in valueSignUp) {
      if (validatePassword(value)) {
        setValueSignUp((prev) => ({ ...prev, password1: value }));
        setValidSignUp((prev) => ({ ...prev, password1: true }));
      } else {
        setValidSignUp((prev) => ({ ...prev, password1: false }));
      }
    } else if ('password' in valueSignUp) {
      if (validatePassword(value)) {
        setValueSignUp((prev) => ({ ...prev, password: value }));
        setValidSignUp((prev) => ({ ...prev, password: true }));
      } else {
        setValidSignUp((prev) => ({ ...prev, password: false }));
      }
    } else if ('new_password' in valueSignUp) {
      if (validatePassword(value)) {
        setValueSignUp((prev) => ({ ...prev, new_password: value }));
        setValidSignUp((prev) => ({ ...prev, new_password: true }));
      } else {
        setValidSignUp((prev) => ({ ...prev, new_password: false }));
      }
    }
  };

  const handleClickEye = (isTrue) => {
    setEye(isTrue);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span style={currentThemeColor}>Сырдык сөз</span>
      </div>
      <div className={styles.input}>
        <input
          onChange={handleChange}
          className={errorValid ? styles.invalid : ''}
          value={password}
          style={currentThemeColor}
          type={eye ? 'password' : 'text'}
        />
        {eye ? (
          <img src={eyeHide} alt="icon" onClick={() => handleClickEye(false)} />
        ) : (
          <img src={eyeShow} alt="icon" onClick={() => handleClickEye(true)} />
        )}
      </div>
      {errorValid && <p className={styles.error}>Сырсөз кеминде 8 белгиден турушу керек.</p>}
    </div>
  );
}

export default Password;
