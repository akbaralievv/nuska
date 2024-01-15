import React from 'react';

import styles from './BookCard.module.css';

import book from '../../assets/images/card.png';
import favorite from '../../assets/icons/favorite.svg';
import favoriteLight from '../../assets/icons/favorite light.svg';
import favoriteSelect from '../../assets/icons/favoriteSelect.svg';
import favoriteSelectLight from '../../assets/icons/favoriteSelect light.svg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BookCard({ data }) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  return (
    <div className={styles.wrapper} style={currentThemeColor}>
      <div className={styles.inner}>
        <NavLink to={`/detail/${data.id}`}>
          <div className={styles.images}>
            <img src={data.cover_image ?? book} alt="book" />
          </div>
        </NavLink>
        <div className={styles.title}>
          <h3 style={currentThemeColor}>{data.name ?? 'Lorem ipsum'}</h3>
          <img src={key === 'dark' ? favoriteSelectLight : favoriteSelect} alt="favorite" />
        </div>
        <div className={styles.description}>
          <p style={currentThemeColor}>Lorem ipsum</p>
          <span>300c</span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
