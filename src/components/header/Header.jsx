import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import search from '../../assets/icons/search icon.svg';
import styles from './Header.module.css';

import { setIsAuth } from '../../redux/slices/isTrue';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import Menu from '../menu/Menu';
import { isUserAuthenticated } from '../helpers/isUserAuthenticated';

function Header() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const handleAuthClick = (e) => {
    dispatch(setIsAuth(e));
  };

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const styleInput = { ...currentThemeColor, paddingLeft: isFocused ? '0' : '61px' };
  const isAuth = isUserAuthenticated();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Menu />
          <BurgerMenu />
          <nav className={styles.nav}>
            {!isAuth && (
              <>
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
              </>
            )}
            <div className={styles.search}>
              <img src={search} alt="search" style={{ display: isFocused ? 'none' : 'block' }} />
              <input
                type="text"
                placeholder="Поиск"
                onChange={handleChangeSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styleInput}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
