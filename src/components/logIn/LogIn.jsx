import React from 'react';

import styles from './LogIn.module.css';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';

function LogIn() {
  return (
    <div className={styles.wrapper}>
      <h3>КирYY</h3>
      <div className={styles.inputs}>
        <Email />
        <Password />
      </div>
      <div className={styles.buttons}>
        <a href="">Forgot password ?</a>
        <a href="">КирYY</a>
      </div>
    </div>
  );
}

export default LogIn;
