import React from 'react';

import styles from './BookCard.module.css';

import book from '../../assets/images/card.png';
import favorite from '../../assets/icons/favorite.svg';
import favoriteLight from '../../assets/icons/favorite light.svg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BookCard() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  return (
    <div className={styles.wrapper} style={currentThemeColor}>
      <NavLink to="/detail">
        <div className={styles.inner}>
          <div className={styles.images}>
            <img src={book} alt="book" />
          </div>
          <div className={styles.title}>
            <h3 style={currentThemeColor}>Lorem ipsum</h3>
            <img src={key === 'dark' ? favorite : favoriteLight} alt="favorite" />
          </div>
          <div className={styles.description}>
            <p style={currentThemeColor}>Lorem ipsum</p>
            <span>300c</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default BookCard;
