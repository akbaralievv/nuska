import React from 'react';
import MyLoader from '../skeletonCard/SkeletonCard';
import styles from './BookLists.module.css';

function BookLists() {
  const books = [...new Array(4)].map((_, index) => <MyLoader key={index} />);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>{books}</div>
      </div>
    </div>
  );
}

export default BookLists;
