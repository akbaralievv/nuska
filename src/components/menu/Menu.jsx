import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Menu.module.css';

import account from '../../assets/icons/menu/account.svg';
import language from '../../assets/icons/menu/language.svg';
import books from '../../assets/icons/menu/books.svg';
import wishlist from '../../assets/icons/menu/wishlist.svg';
import about from '../../assets/icons/menu/about.svg';
import privacy from '../../assets/icons/menu/privacy.svg';
import help from '../../assets/icons/menu/help.svg';
import logout from '../../assets/icons/menu/logout.svg';
import light from '../../assets/icons/menu/light.svg';
import dark from '../../assets/icons/menu/dark.svg';
import darkLight from '../../assets/icons/menu/darkLight.svg';

import BurgerMenu from '../burgerMenu/BurgerMenu';

import { setIsOpenMenu } from '../../redux/slices/isTrue';
import { setTheme } from '../../redux/slices/changeTheme';

function Menu() {
  const { isOpenMenu } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const location = useLocation();
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const isLocation = location.pathname === '/inside';

  const themeLight = (e) => {
    e.preventDefault();
    dispatch(setTheme({ key: 'light', color: '#000' }));
  };
  const themeDark = (e) => {
    e.preventDefault();
    dispatch(setTheme({ key: 'dark', color: '#fff' }));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      dispatch(setIsOpenMenu(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      className={`${styles.wrapper} ${isOpenMenu ? styles.openMenu : styles.closeMenu} ${
        isLocation ? styles.locationInside : ''
      }`}
      ref={menuRef}
      style={{ background: key === 'light' ? '#595959' : '#3B3B3B' }}>
      <div className={styles.inner}>
        <BurgerMenu />
        <div className={styles.navbar}>
          <nav className={styles.nav}>
            <li>
              <NavLink to="/myAccount" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={account} alt="account" />
                <span>Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <img src={language} alt="language" />
                <span>Choose another language</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/myBooks" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={books} alt="books" />
                <span>My books</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/myWishlist" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={wishlist} alt="wishlist" />
                <span>My wishlist</span>
              </NavLink>
            </li>
          </nav>
          <nav className={styles.nav}>
            <li>
              <NavLink onClick={themeLight}>
                <img src={light} alt="light" />
                <span>Light</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={themeDark}>
                <img src={key === 'light' ? dark : darkLight} alt="dark" />
                <span style={{ color: key === 'light' ? '#000' : '#BBB' }}>Dark</span>
              </NavLink>
            </li>
          </nav>
          <nav className={styles.nav}>
            <li>
              <NavLink>
                <img src={about} alt="about" />
                <span>About this app</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <img src={privacy} alt="privacy" />
                <span>Privacy</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <img src={help} alt="help" />
                <span>Help and support</span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                <img src={logout} alt="logout" />
                <span>Log out</span>
              </NavLink>
            </li>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Menu;
