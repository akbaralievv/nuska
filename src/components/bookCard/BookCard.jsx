import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './BookCard.module.css';

import book from '../../assets/images/card.png';
import favorite from '../../assets/icons/favorite.svg';
import favoriteLight from '../../assets/icons/favorite light.svg';
import favoriteSelect from '../../assets/icons/favoriteSelect.svg';
import favoriteSelectLight from '../../assets/icons/favoriteSelect light.svg';

import { setIsFavorites, setIsOpenModalMain } from '../../redux/slices/isTrue';
import { getRefreshToken } from '../helpers/tokens';

const BookCard = React.memo(({ data }) => {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!getRefreshToken()) {
      dispatch(setIsOpenModalMain(true));
      document.body.style.overflow = 'hidden';
    } else {
      localUpdate(!like);
      setLike(!like);
      dispatch(setIsOpenModalMain(false));
      document.body.style.overflow = '';
    }
    return () => {
      dispatch(setIsOpenModalMain(false));
      document.body.style.overflow = '';
    };
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isLiked = favorites?.find((favorite) => favorite.id === data.id);
    setLike(isLiked);
  }, [data]);

  useEffect(() => {
    if (like) {
      dispatch(setIsFavorites(true));
    } else {
      dispatch(setIsFavorites(false));
    }
  }, [like]);

  const localUpdate = (type) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let updatedFavorites = [...favorites];

    if (type) {
      const existingIndex = favorites?.findIndex((favorite) => favorite.id === data.id);
      if (existingIndex === -1) {
        updatedFavorites = [...favorites, data];
      }
    } else {
      const filteredFavorites = favorites?.filter((favorite) => favorite.id !== data.id);
      updatedFavorites = [...filteredFavorites];
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteImg = () => {
    if (key === 'dark') {
      if (like) {
        return favorite;
      } else {
        return favoriteSelectLight;
      }
    } else {
      if (like) {
        return favoriteLight;
      } else {
        return favoriteSelect;
      }
    }
  };

  return (
    <div className={styles.wrapper} style={currentThemeColor}>
      <div className={styles.inner}>
        <NavLink to={`/detail/${data.id}`}>
          <div className={styles.images}>
            <img src={data.cover_image ?? book} alt="book" />
          </div>
        </NavLink>
        <div className={styles.title}>
          <h3 style={currentThemeColor}>{data.name ?? 'Lorem ipsum'}</h3>
          <img src={favoriteImg()} alt="favorite" onClick={handleLike} />
        </div>
        <div className={styles.description}>
          <p style={currentThemeColor}>
            {data.author[0].first_name} {data.author[0].last_name}
          </p>
          <span>300c</span>
        </div>
      </div>
    </div>
  );
});

export default BookCard;
