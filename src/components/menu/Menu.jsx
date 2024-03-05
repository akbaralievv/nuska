import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Menu.module.css';

import account from '../../assets/icons/menu/account.svg';
import author from '../../assets/icons/menu/authorIcon.svg';
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

import {
  setIsLogout,
  setIsOpenMenu,
  setIsOpenModal,
  setIsOpenModalPublicOffer,
} from '../../redux/slices/isTrue';
import { setTheme } from '../../redux/slices/changeTheme';
import { removeAccessToken, removeRefreshToken } from '../helpers/tokens';
import ModalWindow from '../modalWindow/ModalWindow';
import { isUserAuthenticated } from '../helpers/isUserAuthenticated';
import ModalPublicOffer from '../modalPublicOffer/ModalPublicOffer';
import { getPublicOffers } from '../../redux/slices/getPublicOffers';

function Menu() {
  const { isOpenMenu, isOpenModal, isOpenModalPublicOffer } = useSelector((state) => state.isTrue);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: publicOffersData } = useSelector((state) => state.getPublicOffers);

  const [isAuthLog, setIsAuthLog] = useState(isUserAuthenticated());
  const [isPublicOffer, setIsPublicOffer] = useState({
    aboutApp: false,
    publicOffer: false,
    info: false,
  });

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

  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(setIsOpenMenu(false));
    dispatch(setIsLogout(true));
    removeAccessToken();
    removeRefreshToken();
    window.scrollTo(0, 0);
  };

  const about_website = publicOffersData?.find((info) => info.title === 'about_website');
  const public_offer = publicOffersData?.find((info) => info.title === 'public_offer');
  const helps = publicOffersData?.find((info) => info.title === 'help_support');

  const returnPublicOfferText = () => {
    if (isPublicOffer.aboutApp && about_website) {
      return about_website.content;
    } else if (isPublicOffer.publicOffer && public_offer) {
      return public_offer.content;
    } else if (isPublicOffer.info && helps) {
      return helps.content;
    }
  };

  const openModalPublicOffer = (e, string) => {
    e.preventDefault();
    dispatch(setIsOpenModalPublicOffer(true));
    document.body.style.overflow = 'hidden';
    dispatch(getPublicOffers());
    if (string === 'aboutApp') {
      setIsPublicOffer((prev) => ({ ...prev, aboutApp: true, publicOffer: false, info: false }));
    } else if (string === 'publicOffer') {
      setIsPublicOffer((prev) => ({ ...prev, aboutApp: false, publicOffer: true, info: false }));
    } else if (string === 'info') {
      setIsPublicOffer((prev) => ({ ...prev, aboutApp: false, publicOffer: false, info: true }));
    } else if (!string) {
      setIsPublicOffer((prev) => ({ ...prev, aboutApp: false, publicOffer: false, info: false }));
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${isOpenMenu ? styles.openMenu : styles.closeMenu} ${
        isLocation ? styles.locationInside : ''
      }`}
      ref={menuRef}
      style={{ background: key === 'light' ? '#595959' : '#3B3B3B' }}>
      <div className={styles.inner}>
        <BurgerMenu />
        {isOpenModalPublicOffer && <ModalPublicOffer text={returnPublicOfferText()} />}
        <div className={styles.navbar}>
          <nav className={styles.nav}>
            <li>
              <NavLink to="/myAccount" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={account} alt="account" />
                <span>Аккаунт</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/myBooks" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={books} alt="books" />
                <span>Менин китептерим</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/myWishlist" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={wishlist} alt="wishlist" />
                <span>Тандалгандар</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/authorBooks" onClick={() => dispatch(setIsOpenMenu(false))}>
                <img src={author} alt="authorBooks" />
                <span>Авторлугум</span>
              </NavLink>
            </li>
          </nav>
          <nav className={styles.nav}>
            <li>
              <NavLink onClick={themeLight}>
                <img src={light} alt="light" />
                <span>Ачык</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={themeDark}>
                <img src={key === 'light' ? dark : darkLight} alt="dark" />
                <span style={{ color: key === 'light' ? '#000' : '#BBB' }}>Күңүрт</span>
              </NavLink>
            </li>
          </nav>
          <nav className={styles.nav}>
            <li>
              <NavLink onClick={(e) => openModalPublicOffer(e, 'aboutApp')}>
                <img src={about} alt="about" />
                <span>Тиркеме жөнүндө</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={(e) => openModalPublicOffer(e, 'publicOffer')}>
                <img src={privacy} alt="privacy" />
                <span>Купуялык</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={(e) => openModalPublicOffer(e, 'info')}>
                <img src={help} alt="help" />
                <span>Жардам & Колдоо</span>
              </NavLink>
            </li>
            {isAuthLog && (
              <li>
                <NavLink to={'/'} onClick={handleClickLogout}>
                  <img src={logout} alt="logout" />
                  <span>Чыгуу</span>
                </NavLink>
              </li>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Menu;
