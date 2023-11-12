import React from 'react';

import icon from '../../../assets/icons/auth/email.svg';
import styles from './Email.module.css';

function Email() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={icon} alt="icon" />
        <span>Email address</span>
      </div>
      <input type="text" />
    </div>
  );
}

export default Email;
