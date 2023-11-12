import React from 'react';

import SkeletonCard from '../skeletonCard/SkeletonCard';
import BookCard from '../bookCard/BookCard';

import ads from '../../assets/images/ads.png';
import styles from './BookLists.module.css';

function BookLists() {
  const books = [...new Array(6)].map((_, index) => <BookCard key={index} />);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.catalog}>
            <h2>Популярные</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2>Бестселлеры</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2>Новые</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.ads}>
            <img src={ads} alt="ads" />
          </section>
          <section className={styles.catalog}>
            <h2>Триллеры</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2>Фантастика</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookLists;
