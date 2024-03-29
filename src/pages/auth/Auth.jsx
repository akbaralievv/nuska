import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Auth.module.css';
import image from '../../assets/images/auth-image.png';
import logo from '../../assets/images/logo.png';
import LogIn from '../../components/logIn/LogIn';
import SignUp from '../../components/signUp/SignUp';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const { isAuth } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2>Welcome to</h2>
          <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
          <img src={image} alt="image" className={styles.image} />
        </div>
        <div
          className={styles.form}
          style={{
            boxShadow:
              key === 'light'
                ? '-13px 22px 20px 0px rgba(0, 0, 0, 0.25)'
                : '-13px 22px 20px 0px #494949',
          }}>
          {isAuth ? <LogIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
