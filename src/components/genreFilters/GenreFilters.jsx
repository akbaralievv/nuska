import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './GenreFilters.module.css';
import { getGenres } from '../../redux/slices/getGenres';
import { getBooks } from '../../redux/slices/book/getBooks';

function GenreFilters() {
  const { jenres, loading, error } = useSelector((state) => state.getGenres);
  const { currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [activeGenre, setActiveGenre] = useState(null);

  const dispatch = useDispatch();
  const genreFiltersRef = useRef(null);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genreFiltersRef.current &&
        !genreFiltersRef.current.contains(event.target) &&
        activeGenre !== null
      ) {
        setActiveGenre(null);
        dispatch(getBooks(null));
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
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.genreFilters} ref={genreFiltersRef}>
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
