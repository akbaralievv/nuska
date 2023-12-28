import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SkeletonCard from '../skeletonCard/SkeletonCard';
import BookCard from '../bookCard/BookCard';

import ads from '../../assets/images/ads.png';
import styles from './BookLists.module.css';
import { getBooks } from '../../redux/slices/getBooks';
import { getBestsellingBooks } from '../../redux/slices/getBestsellingBooks';

function BookLists() {
  const { data, loading, error } = useSelector((state) => state.getBooks);
  const { data: bestselling } = useSelector((state) => state.getBestsellingBooks);
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getBestsellingBooks());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
            <h2 style={currentThemeColor}>Популярные</h2>
            <Slider {...settings}>
              {data?.map((book) => (
                <BookCard key={book.id} data={book} />
              ))}
            </Slider>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Бестселлеры</h2>
            <Slider {...settings}>
              {bestselling?.map((book) => (
                <BookCard key={book.id} data={book} />
              ))}
            </Slider>
          </section>
          {/* <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Новые</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.ads}>
            <img src={ads} alt="ads" />
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Триллеры</h2>
            <div className={styles.bookCards}>{books}</div>
          </section>
          <section className={styles.catalog}>
            <h2 style={currentThemeColor}>Фантастика</h2>
            <div className={styles.bookCards}>{books}</div>
          </section> */}
        </div>
      </div>
    </div>
  );
}

export default BookLists;
