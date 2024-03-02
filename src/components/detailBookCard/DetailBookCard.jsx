import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './DetailBookCard.module.css';

import book from '../../assets/images/card.png';
import favorite from '../../assets/icons/favorite.svg';
import favoriteLight from '../../assets/icons/favorite light.svg';
import favoriteSelect from '../../assets/icons/favoriteSelect.svg';
import favoriteSelectLight from '../../assets/icons/favoriteSelect light.svg';

import { setIsDetailCard, setIsFavorites } from '../../redux/slices/isTrue';
import { NavLink } from 'react-router-dom';

const DetailBookCard = React.memo(({ book }) => {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { isOpenModal, isDetailCard } = useSelector((state) => state.isTrue);

  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    localUpdate(!like);
    setLike(!like);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isLiked = favorites?.find((favorite) => favorite.id === book.id);
    setLike(isLiked);
  }, [book]);

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
      const existingIndex = favorites?.findIndex((favorite) => favorite.id === book.id);
      if (existingIndex === -1) {
        updatedFavorites = [...favorites, book];
      }
    } else {
      const filteredFavorites = favorites?.filter((favorite) => favorite.id !== book.id);
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
    <div className={styles.book} key={book.id}>
      <NavLink to={`/detail/${book.id}`} onClick={() => dispatch(setIsDetailCard(!isDetailCard))}>
        <div className={styles.image}>
          <img src={book.cover_image ?? imageBook} alt="imageBook" />
        </div>
      </NavLink>
      <div className={styles.title}>
        <h4 style={currentThemeColor}>
          {book.name ?? 'Ак кеме'}
          <img src={favoriteImg()} alt="favorite" onClick={handleLike} />
        </h4>
        <div>
          <p style={currentThemeColor}>
            {book.author[0].first_name || book.author[0].last_name
              ? `${book.author[0].first_name} ${book.author[0].last_name}`
              : 'Чынгыз Айтматов'}
          </p>
          <span>300c</span>
        </div>
      </div>
    </div>
  );
});

export default DetailBookCard;
