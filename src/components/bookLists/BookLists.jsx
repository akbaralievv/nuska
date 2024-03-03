import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SkeletonCard from '../skeletonCard/SkeletonCard';
import BookCard from '../bookCard/BookCard';

import ads from '../../assets/images/ads.png';
import arrow from '../../assets/icons/arrow.png';
import arrowWhite from '../../assets/icons/arrowWhite.png';
import styles from './BookLists.module.css';

import { clearDataBooks, getBooks } from '../../redux/slices/book/getBooks';
import {
  clearDataBestsellingBooks,
  getBestsellingBooks,
} from '../../redux/slices/book/getBestsellingBooks';
import { clearDataNewBooks, getNewbooks } from '../../redux/slices/book/getNewbooks';

function CustomNextArrow(props) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { className, style, onClick } = props;

  return (
    <div className={className} style={{ ...style, cursor: 'pointer' }} onClick={onClick}>
      <img src={key === 'light' ? arrow : arrowWhite} alt="arrow" />
    </div>
  );
}

function BookLists() {
  const { data, loading, error } = useSelector((state) => state.getBooks);
  const { data: bestselling } = useSelector((state) => state.getBestsellingBooks);
  const { data: newbooks } = useSelector((state) => state.getNewbooks);

  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const { isActiveJenres } = useSelector((state) => state.getGenres);


  const dispatch = useDispatch();

  useEffect(() => {
    if (isActiveJenres) {
      dispatch(getBooks(isActiveJenres));
      dispatch(getBestsellingBooks(isActiveJenres));
      dispatch(getNewbooks(isActiveJenres));
    } else {
      dispatch(getBooks());
      dispatch(getBestsellingBooks());
      dispatch(getNewbooks());
    }
    return () => {
      dispatch(clearDataBestsellingBooks());
      dispatch(clearDataBooks());
      dispatch(clearDataNewBooks());
    };
  }, [dispatch]);

  const skeletonBooks = [...new Array(6)].map((_, id) => <SkeletonCard key={id} />);

  const settingsData = {
    dots: true,
    infinite: data?.length > 6 ? true : false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsBestselling = {
    dots: true,
    infinite: bestselling?.length > 6 ? true : false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsNewbooks = {
    dots: true,
    infinite: newbooks?.length > 6 ? true : false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Популярдуу</h2>
            <Slider {...settingsData}>
              {loading ? (
                skeletonBooks
              ) : data.length > 0 ? (
                data?.map((book) => <BookCard key={book.id} data={book} />)
              ) : (
                <p className={styles.nothing}>
                  <span style={currentThemeColor}>Бул жанрда китептер табылган жок</span>
                </p>
              )}
            </Slider>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Мыкты сатылган китептер</h2>
            <Slider {...settingsBestselling}>
              {loading
                ? skeletonBooks
                : bestselling?.map((book) => <BookCard key={book.id} data={book} />)}
            </Slider>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Жаңылар</h2>
            <Slider {...settingsNewbooks}>
              {loading
                ? skeletonBooks
                : newbooks?.map((book) => <BookCard key={book.id} data={book} />)}
            </Slider>
          </section>
          <section className={styles.ads}>
            <img src={ads} alt="ads" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookLists;
