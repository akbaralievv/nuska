import React from 'react';

import playMarket from '../../assets/images/play market.png';

import styles from './Footer.module.css';
import { useSelector } from 'react-redux';

function Footer() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.genreFilters}>
            <nav className={styles.nav}>
              <li>
                <h3>Жанрлар</h3>
              </li>
              <li>
                <a href="" style={currentThemeColor}>
                  Триллер
                </a>
              </li>
              <li>
                <a href="" style={currentThemeColor}>
                  Хоррор
                </a>
              </li>
              <li>
                <a href="" style={currentThemeColor}>
                  Драма
                </a>
              </li>
              <li>
                <a href="" style={currentThemeColor}>
                  Жаны
                </a>
              </li>
              <li>
                <a href="" style={currentThemeColor}>
                  Сунуштоо
                </a>
              </li>
            </nav>
          </div>
          <div className={styles.infoLinks}>
            <a href="" className={styles.playMarket}>
              <img src={playMarket} alt="playMarket" />
              <div className={styles.text}>
                <p style={currentThemeColor}>Жүктөп алуу үчүн</p>
                <h4 style={currentThemeColor}>Google Play</h4>
              </div>
            </a>
            <div className={styles.footer}>
              <a href="" style={currentThemeColor}>
                Тех. колдоо: nuska@book.kg
              </a>
              <a href="" style={currentThemeColor}>
                Купуялык & саясат
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.darkGray}></div>
    </div>
  );
}

export default Footer;
