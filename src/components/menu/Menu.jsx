import React, { startTransition, useEffect } from 'react';

import styles from './Menu.module.css';

import account from '../../assets/icons/menu/account.svg';
import language from '../../assets/icons/menu/language.svg';
import books from '../../assets/icons/menu/books.svg';
import wishlist from '../../assets/icons/menu/wishlist.svg';
import about from '../../assets/icons/menu/about.svg';
import privacy from '../../assets/icons/menu/privacy.svg';
import help from '../../assets/icons/menu/help.svg';
import logout from '../../assets/icons/menu/logout.svg';

import BurgerMenu from '../burgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenMenu } from '../../redux/slices/isTrue';

function Menu()
{
  const { isOpenMenu } = useSelector((state) => state.isTrue);
  const dispatch = useDispatch();

  const handleOpenClick = (e) =>
  {
    e.preventDefault();
    dispatch(setIsOpenMenu(!isOpenMenu));
  };
  useEffect(() =>
  {
    isOpenMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
  }, [isOpenMenu])

  return (
    <div onClick={handleOpenClick} className={styles.walpaper}>
      <div onClick={(e) => e.stopPropagation()} className={`${styles.wrapper} ${isOpenMenu ? styles.openMenu : styles.closeMenu}`}>
        <div className={styles.inner}>
          <BurgerMenu />
          <div className={styles.navbar}>
            <nav className={styles.nav}>
              <li>
                <NavLink to="/myAccount">
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
                <NavLink to="/myBooks">
                  <img src={books} alt="books" />
                  <span>My books</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/myWishlist">
                  <img src={wishlist} alt="wishlist" />
                  <span>My wishlist</span>
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
    </div >
  );
}

export default Menu;
