import React from 'react';

import playMarket from '../../assets/images/play market.png';

import styles from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsActiveJenres, getGenres } from '../../redux/slices/getGenres';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../redux/slices/book/getBooks';
import { getNewbooks } from '../../redux/slices/book/getNewbooks';
import { getBestsellingBooks } from '../../redux/slices/book/getBestsellingBooks';

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { jenres, isActiveJenres } = useSelector((state) => state.getGenres);

  React.useEffect(() => {
    dispatch(getGenres());
  }, []);

  const clickCateg = (e, genre) => {
    e.preventDefault();
    navigate('/');
    dispatch(changeIsActiveJenres(genre));
    dispatch(getBooks(genre));
    dispatch(getNewbooks(genre));
    dispatch(getBestsellingBooks(genre));
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.genreFilters}>
            <nav className={styles.nav}>
              <li>
                <h3>Жанрлар</h3>
              </li>
              {jenres?.slice(0, 5)?.map((categ) => (
                <li key={categ?.id} onClick={(e) => clickCateg(e, categ?.id)}>
                  <a style={currentThemeColor}>{categ?.name}</a>
                </li>
              ))}
            </nav>
          </div>
          <div className={styles.infoLinks}>
            <a href="" className={styles.playMarket}>
              <img src={playMarket} alt="playMarket" />
              <div className={styles.text}>
                <p style={currentThemeColor}>Жүктөп алуу үчүн</p>
                <h4 style={currentThemeColor}>Google Play</h4>
              </div>
            </a>
            <div className={styles.footer}>
              <a href="" style={currentThemeColor}>
                Тех. колдоо: nuska@book.kg
              </a>
              <a href="" style={currentThemeColor}>
                Купуялык & саясат
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.darkGray}></div>
    </div>
  );
}

export default Footer;
