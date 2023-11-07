import React from 'react';

import styles from './GenreFilters.module.css';

function GenreFilters() {
  return (
    <nav className={styles.genreFilters}>
      <li>
        <a href="">Драма</a>
      </li>
      <li>
        <a href="">Триллер</a>
      </li>
      <li>
        <a href="">Комедия</a>
      </li>
      <li>
        <a href="">Фантастика</a>
      </li>
      <li>
        <a href="">Романтика</a>
      </li>
      <li>
        <a href="">Хоррор</a>
      </li>
    </nav>
  );
}

export default GenreFilters;
