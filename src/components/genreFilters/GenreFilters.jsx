import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './GenreFilters.module.css';
import { getGenres } from '../../redux/slices/getGenres';

function GenreFilters() {
  const { jenres, loading, error } = useSelector((state) => state.getGenres);
  const { theme, currentThemeColor } = useSelector((state) => state.changeTheme);
  const [activeGenre, setActiveGenre] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <ul className={styles.genreFilters}>
      {jenres?.map((genre) => (
        <li key={genre.id} className={activeGenre === genre.name ? styles.active : ''}>
          <a href="#" onClick={() => handleGenreClick(genre.name)} style={currentThemeColor}>
            {genre.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreFilters;
