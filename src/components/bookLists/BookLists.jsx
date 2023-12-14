import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SkeletonCard from '../skeletonCard/SkeletonCard';
import BookCard from '../bookCard/BookCard';

import ads from '../../assets/images/ads.png';
import styles from './BookLists.module.css';
import { getBooks } from '../../redux/slices/getBooks';

function BookLists() {
  const { data, loading, error } = useSelector((state) => state.getBooks);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const dispatch = useDispatch();

  const books = [...new Array(6)].map((_, index) => <BookCard key={index} />);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Популярные</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Бестселлеры</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Новые</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.ads}>
            <img src={ads} alt="ads" />
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Триллеры</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Фантастика</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookLists;
