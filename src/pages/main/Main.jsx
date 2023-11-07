import React from 'react';

import styles from './Main.module.css';
import GenreFilters from '../../components/genreFilters/GenreFilters';
import BookLists from '../../components/bookLists/BookLists';

function Main() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <GenreFilters />
          <BookLists />
        </div>
      </div>
    </div>
  );
}

export default Main;
