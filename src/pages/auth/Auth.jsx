import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Auth.module.css';
import image from '../../assets/images/auth-image.png';
import logo from '../../assets/images/logo.png';
import LogIn from '../../components/logIn/LogIn';
import SignUp from '../../components/signUp/SignUp';

function Auth() {
  const { isAuth } = useSelector((state) => state.isTrue);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2>Welcome to</h2>
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={image} alt="image" className={styles.image} />
        </div>
        <div className={styles.form}>{isAuth ? <LogIn /> : <SignUp />}</div>
      </div>
    </div>
  );
}

export default Auth;
