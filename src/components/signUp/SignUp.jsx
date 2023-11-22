import React from 'react';

import styles from './SignUp.module.css';

import Username from '../inputs/username/Username';
import Email from '../inputs/email/Email';
import Password from '../inputs/password/Password';

function SignUp() {
  return (
    <form className={styles.wrapper}>
      <h3>Катталуу</h3>
      <div className={styles.inputs}>
        <Username />
        <Email />
        <Password />
      </div>
      <div className={styles.buttons}>
        <a href="">Катталуу</a>
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="checkbox" />
          <label htmlFor="checkbox">Соглашение об использовании приложения и купленных книг</label>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
