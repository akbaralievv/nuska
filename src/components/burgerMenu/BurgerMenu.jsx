import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setIsOpenMenu } from '../../redux/slices/isTrue';

import styles from './BurgerMenu.module.css';
import logo from '../../assets/images/logo.png';
import burger from '../../assets/icons/burger menu.svg';
import close from '../../assets/icons/menu/closeMenu.svg';

function BurgerMenu() {
  const { isOpenMenu } = useSelector((state) => state.isTrue);
  const dispatch = useDispatch();

  const handleOpenClick = (e) => {
    e.preventDefault();
    dispatch(setIsOpenMenu(!isOpenMenu));
  };

  return (
    <div className={styles.wrapper}>
      <a href="" className={styles.menu} onClick={handleOpenClick}>
        <img src={isOpenMenu ? close : burger} alt="burger" />
      </a>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="logo" onClick={() => dispatch(setIsOpenMenu(false))} />
      </NavLink>
    </div>
  );
}

export default BurgerMenu;
