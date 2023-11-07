import React from 'react';

import search from '../../assets/icons/search icon.svg';

import styles from './Header.module.css';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import Menu from '../menu/Menu';

function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Menu />
          <BurgerMenu />
          <nav className={styles.nav}>
            <div className={styles.search}>
              <img src={search} alt="search" />
              <input type="text" placeholder="Поиск" />
            </div>
            <a href="" className={styles.auth}>
              Log in
            </a>
            <a href="" className={styles.auth}>
              Sign up
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
