import React from 'react';
import { useSelector } from 'react-redux';

import styles from './MyBooks.module.css';
import image from '../../assets/images/detail/imageBook.png';

function MyBooks() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.inner}>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3 style={currentThemeColor}>
                A Mersey Killing: When Liverpool Rocked and the Music died
              </h3>
              <p style={currentThemeColor}>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button style={currentThemeColor}>Read</button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3 style={currentThemeColor}>
                A Mersey Killing: When Liverpool Rocked and the Music died
              </h3>
              <p style={currentThemeColor}>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button style={currentThemeColor}>Read</button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3 style={currentThemeColor}>
                A Mersey Killing: When Liverpool Rocked and the Music died
              </h3>
              <p style={currentThemeColor}>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button style={currentThemeColor}>Read</button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3 style={currentThemeColor}>
                A Mersey Killing: When Liverpool Rocked and the Music died
              </h3>
              <p style={currentThemeColor}>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button style={currentThemeColor}>Read</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyBooks;
