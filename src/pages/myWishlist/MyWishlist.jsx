import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './MyWishlist.module.css';
import basket from '../../assets/icons/basket.svg';
import basketBlack from '../../assets/icons/basketBlack.svg';
import image from '../../assets/images/detail/imageBook.png';
import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';

function MyWishlist() {
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
            <span>My wishlist</span>
          </header>
          <ul className={styles.content}>
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
                  <button style={currentThemeColor}>
                    Remove <img src={key === 'dark' ? basket : basketBlack} alt="basket" />
                  </button>
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
                  <button style={currentThemeColor}>
                    Remove <img src={key === 'dark' ? basket : basketBlack} alt="basket" />
                  </button>
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
                  <button style={currentThemeColor}>
                    Remove <img src={key === 'dark' ? basket : basketBlack} alt="basket" />
                  </button>
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
                  <button style={currentThemeColor}>
                    Remove <img src={key === 'dark' ? basket : basketBlack} alt="basket" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyWishlist;
