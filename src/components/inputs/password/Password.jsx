import React from 'react';

import icon from '../../../assets/icons/auth/password.svg';
import styles from './Password.module.css';

function Password() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span>Password</span>
      </div>
      <input type="text" />
    </div>
  );
}

export default Password;
