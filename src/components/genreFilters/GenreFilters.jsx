import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './GenreFilters.module.css';
import { clearDataGenres, getGenres } from '../../redux/slices/getGenres';
import { getBooks } from '../../redux/slices/book/getBooks';
import { getNewbooks } from '../../redux/slices/book/getNewbooks';
import { getBestsellingBooks } from '../../redux/slices/book/getBestsellingBooks';

function GenreFilters() {
  const { jenres, loading, error } = useSelector((state) => state.getGenres);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [activeGenre, setActiveGenre] = useState(0);

  const dispatch = useDispatch();
  const genreFiltersRef = useRef(null);

  useEffect(() => {
    dispatch(getGenres());
    return () => {
      dispatch(clearDataGenres());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genreFiltersRef.current &&
        !genreFiltersRef.current.contains(event.target) &&
        activeGenre !== 0
      ) {
        // setActiveGenre(null);
        // dispatch(getBooks(null));
        // dispatch(getNewbooks(null));
        // dispatch(getBestsellingBooks(null));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [genreFiltersRef, activeGenre]);

  const handleGenreClick = (genre, e) => {
    e.preventDefault();
    setActiveGenre(genre);
    dispatch(getBooks(genre));
    dispatch(getNewbooks(genre));
    dispatch(getBestsellingBooks(genre));
  };

  return (
    <div className={styles.wrapper}>
      <ul
        className={`${styles.genreFilters} ${key === 'dark' ? styles.darkTheme : ''}`}
        ref={genreFiltersRef}>
        <li className={activeGenre === 0 ? styles.active : ''}><a href="#" onClick={(e) => handleGenreClick(0, e)} style={currentThemeColor}>Все</a></li>
        {jenres?.map((genre) => (
          <li key={genre.id} className={activeGenre === genre.id ? styles.active : ''}>
            <a href="#" onClick={(e) => handleGenreClick(genre.id, e)} style={currentThemeColor}>
              {genre.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreFilters;
