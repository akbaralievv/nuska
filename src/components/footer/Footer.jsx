import React from 'react';

import playMarket from '../../assets/images/play market.png';

import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.genreFilters}>
            <nav className={styles.nav}>
              <li>
                <h3>Жанры</h3>
              </li>
              <li>
                <a href="">Триллер</a>
              </li>
              <li>
                <a href="">Хоррор</a>
              </li>
              <li>
                <a href="">Драма</a>
              </li>
              <li>
                <a href="">Еще драма</a>
              </li>
              <li>
                <a href="">И хоррор</a>
              </li>
            </nav>
            <nav className={styles.nav}>
              <li>
                <h3>Жанры</h3>
              </li>
              <li>
                <a href="">Триллер</a>
              </li>
              <li>
                <a href="">Хоррор</a>
              </li>
              <li>
                <a href="">Драма</a>
              </li>
              <li>
                <a href="">Еще драма</a>
              </li>
              <li>
                <a href="">И хоррор</a>
              </li>
            </nav>
          </div>
          <div className={styles.infoLinks}>
            <a href="" className={styles.playMarket}>
              <img src={playMarket} alt="playMarket" />
              <div className={styles.text}>
                <p>Get it on</p>
                <h4>Google Play</h4>
              </div>
            </a>
            <div className={styles.footer}>
              <a href="">Тех. поддержка: nuska@book.kg</a>
              <a href="">Privacy & Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.darkGray}></div>
    </div>
  );
}

export default Footer;
