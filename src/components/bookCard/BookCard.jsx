import React from 'react';

import styles from './BookCard.module.css';
import book from '../../assets/images/card.png';
import favorite from '../../assets/icons/favorite.svg';
import { NavLink } from 'react-router-dom';

function BookCard() {
  return (
    <div className={styles.wrapper}>
      <NavLink to="/detail">
        <div className={styles.inner}>
          <div className={styles.images}>
            <img src={book} alt="book" />
          </div>
          <div className={styles.title}>
            <h3>Lorem ipsum</h3>
            <img src={favorite} alt="favorite" />
          </div>
          <div className={styles.description}>
            <p>Lorem ipsum</p>
            <span>300c</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default BookCard;
