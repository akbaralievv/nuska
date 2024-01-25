import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './MyBooks.module.css';
import image from '../../assets/images/detail/imageBook.png';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';

function MyBooks() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.menuHeader}>
              <Menu />
              <BurgerMenu />
            </div>
            <span>Китептерим</span>
          </header>
          <div className={styles.nothing}>
            <h2 style={currentThemeColor}>Сатып алынган китептердин тизмеси бош.</h2>
            <hr />
          </div>
          <h2 style={currentThemeColor}>Сунуштоо</h2>
          <ul className={styles.content}>
            <li className={styles.book}>
              <NavLink to="payment">
                <div className={styles.image}>
                  <img src={image} alt="image" />
                </div>
              </NavLink>
              <div className={styles.title}>
                <h3 style={currentThemeColor}>Кылым карытар бир күн</h3>
                <p style={currentThemeColor}>Чынгыз Айтматов</p>
                <div className={styles.footer}>
                  <span>Сайтка киргизилген датасы 12/12/2023</span>
                  <button style={currentThemeColor}>Окуу</button>
                </div>
              </div>
            </li>
            <li className={styles.book}>
              <div className={styles.image}>
                <img src={image} alt="image" />
              </div>
              <div className={styles.title}>
                <h3 style={currentThemeColor}>Кылым карытар бир күн</h3>
                <p style={currentThemeColor}>Чынгыз Айтматов</p>
                <div className={styles.footer}>
                  <span>Сайтка киргизилген датасы 12/12/2023</span>
                  <button style={currentThemeColor}>Окуу</button>
                </div>
              </div>
            </li>
            <li className={styles.book}>
              <div className={styles.image}>
                <img src={image} alt="image" />
              </div>
              <div className={styles.title}>
                <h3 style={currentThemeColor}>Кылым карытар бир күн</h3>
                <p style={currentThemeColor}>Чынгыз Айтматов</p>
                <div className={styles.footer}>
                  <span>Сайтка киргизилген датасы 12/12/2023</span>
                  <button style={currentThemeColor}>Окуу</button>
                </div>
              </div>
            </li>
            <li className={styles.book}>
              <div className={styles.image}>
                <img src={image} alt="image" />
              </div>
              <div className={styles.title}>
                <h3 style={currentThemeColor}>Кылым карытар бир күн</h3>
                <p style={currentThemeColor}>Чынгыз Айтматов</p>
                <div className={styles.footer}>
                  <span>Сайтка киргизилген датасы 12/12/2023</span>
                  <button style={currentThemeColor}>Окуу</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyBooks;
