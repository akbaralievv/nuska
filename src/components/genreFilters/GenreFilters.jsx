import React, { useState } from 'react';
import styles from './GenreFilters.module.css';

function GenreFilters() {
  const [activeGenre, setActiveGenre] = useState(null);

  const genres = ['Драма', 'Триллер', 'Комедия', 'Фантастика', 'Романтика', 'Хоррор'];

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <ul className={styles.genreFilters}>
      {genres.map((genre, index) => (
        <li key={index} className={activeGenre === genre ? styles.active : ''}>
          <a href="#" onClick={() => handleGenreClick(genre)}>
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreFilters;
