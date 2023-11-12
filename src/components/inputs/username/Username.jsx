import React from 'react';

import icon from '../../../assets/icons/auth/username.svg';
import styles from './Username.module.css';

function Username() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span>User name</span>
      </div>
      <input type="text" />
    </div>
  );
}

export default Username;
