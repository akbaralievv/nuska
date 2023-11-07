import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsOpenMenu } from '../../redux/slices/isTrue';

import logo from '../../assets/images/logo.png';
import burger from '../../assets/icons/burger menu.svg';

import styles from './BurgerMenu.module.css';
import { NavLink } from 'react-router-dom';

function BurgerMenu() {
  const { isOpenMenu } = useSelector((state) => state.isTrue);
  const dispatch = useDispatch();

  const handleOpenClick = (e) => {
    e.preventDefault();
    dispatch(setIsOpenMenu(!isOpenMenu));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <a href="">
          <img src={burger} alt="burger" onClick={handleOpenClick} />
        </a>
      </div>
      <NavLink className={styles.logo}>
        <img src={logo} alt="logo" />
      </NavLink>
    </div>
  );
}

export default BurgerMenu;
