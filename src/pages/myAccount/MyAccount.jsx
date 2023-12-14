import React from 'react';
import { useSelector } from 'react-redux';

import styles from './MyAccount.module.css';
import images from '../../assets/images/myAccount.png';
import favorites from '../../assets/icons/favorite.svg';
import readed from '../../assets/icons/readed.svg';

function MyAccount() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h2>Lorem Ipsum</h2>
        <p>loremipsum@gmail.com</p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <img src={images} alt="images" />
            </div>
            <div className={styles.info}>
              <h3 style={currentThemeColor}>20</h3>
              <p style={currentThemeColor}>Мои книги</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <img src={images} alt="images" />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>
                <img src={favorites} alt="favorites" />
                <h3 style={currentThemeColor}>20</h3>
              </div>
              <p style={currentThemeColor}>Сохраненные</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <img src={images} alt="images" />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>
                <img src={readed} alt="favorites" />
                <h3 style={currentThemeColor}>20</h3>
              </div>
              <p style={currentThemeColor}>Прочитанные</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
