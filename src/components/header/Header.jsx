import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import search from '../../assets/icons/search icon.svg';
import styles from './Header.module.css';

import { setIsAuth } from '../../redux/slices/isTrue';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import Menu from '../menu/Menu';

function Header() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const dispatch = useDispatch();

  const handleAuthClick = (e) => {
    dispatch(setIsAuth(e));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Menu />
          <BurgerMenu />
          <nav className={styles.nav}>
            <div className={styles.search}>
              <img src={search} alt="search" />
              <input type="text" placeholder="Поиск" style={currentThemeColor} />
            </div>
            <NavLink
              to="/auth"
              className={styles.auth}
              onClick={() => handleAuthClick(true)}
              style={currentThemeColor}>
              Log in
            </NavLink>
            <NavLink
              to="/auth"
              className={styles.auth}
              onClick={() => handleAuthClick(false)}
              style={currentThemeColor}>
              Sign up
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
