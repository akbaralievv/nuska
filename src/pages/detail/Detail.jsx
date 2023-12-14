import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Detail.module.css';
import eBook from '../../assets/icons/detail/e-book.svg';
import imageBook from '../../assets/images/detail/imageBook.png';
import imageHome from '../../assets/images/card.png';
import favoriteDet from '../../assets/icons/detail/favoriteDet.svg';
import triangle from '../../assets/images/detail/triangle.png';
import triangleDark from '../../assets/images/detail/triangleDark.png';

function Detail() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.home}>
            <div className={styles.title}>
              <div className={styles.text}>
                <h2 style={currentThemeColor}>
                  A Mersey Killing: When Liverpool Rocked and the Music died
                </h2>
                <p style={currentThemeColor}>Brian L. Porter</p>
              </div>
              <div className={styles.infoNumbers}>
                <div className={styles.info}>
                  <img src={eBook} alt="eBook" />
                  <p style={currentThemeColor}>e-book</p>
                </div>
                <div className={styles.info}>
                  <span>300</span>
                  <p style={currentThemeColor}>Количество страниц</p>
                </div>
                <div className={styles.info}>
                  <span>300c</span>
                  <p style={currentThemeColor}>Цена</p>
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <img src={imageHome} alt="imageHome" />
            </div>
          </section>
          <section className={styles.about}>
            <div className={styles.this}>
              <div className={styles.aboutBook}>
                <h3>About this book</h3>
                <p style={currentThemeColor}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </p>
                <div className={styles.buttons}>
                  <NavLink to="/inside">Читать 15 стр</NavLink>
                  <button className={styles.green} style={currentThemeColor}>
                    Buy this book
                  </button>
                  <button>
                    <img src={favoriteDet} alt="favorite" />
                    <span>Add to wishlist</span>
                  </button>
                </div>
              </div>
              <div
                className={styles.available}
                style={
                  key === 'light'
                    ? { border: '3px solid #404040' }
                    : { border: '3px solid #5CC11F' }
                }>
                <h4 style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                  Здесь можно купить бумажный вариант:
                </h4>
                <div className={styles.infos}>
                  <div className={styles.info}>
                    <p style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                      Адрес:
                    </p>
                    <p style={key === 'light' ? { color: '#404040' } : { color: 'white' }}>
                      Lorem ipsum, 1
                    </p>
                  </div>
                  <div className={styles.info}>
                    <p style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                      Контакты:
                    </p>
                    <p style={key === 'light' ? { color: '#404040' } : { color: 'white' }}>
                      996700123456
                    </p>
                  </div>
                  <div className={styles.info}>
                    <p style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                      IG аккаунт:
                    </p>
                    <p style={key === 'light' ? { color: '#404040' } : { color: 'white' }}>
                      @nuska.book.kg
                    </p>
                  </div>
                </div>
                <img src={key === 'light' ? triangle : triangleDark} alt="triangle" />
                <span style={key === 'light' ? { color: '#B1B1B1' } : { color: 'black' }}>
                  Нет в наличии
                </span>
              </div>
              <div className={styles.reviews}>
                <h3>Отзывы</h3>
                <div className={styles.users}>
                  <div className={styles.user}>
                    <div className={styles.title}>
                      <div className={styles.name}>
                        <div className={styles.img}></div>
                        <h4 style={currentThemeColor}>Lorem Ipsum</h4>
                      </div>
                      <span className={styles.date}>29.09.2023</span>
                    </div>
                    <p className={styles.description} style={currentThemeColor}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className={styles.user}>
                    <div className={styles.title}>
                      <div className={styles.name}>
                        <div className={styles.img}></div>
                        <h4 style={currentThemeColor}>Lorem Ipsum</h4>
                      </div>
                      <span className={styles.date}>29.09.2023</span>
                    </div>
                    <p className={styles.description} style={currentThemeColor}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <form className={styles.send}>
                  <textarea
                    id="review"
                    name="review"
                    rows="4"
                    cols="50"
                    placeholder="Оставить отзыв..."
                    style={currentThemeColor}></textarea>
                  <button type="submit" style={currentThemeColor}>
                    Отправить
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.other}>
              <h3>Other recommended books</h3>
              <div className={styles.books}>
                <div className={styles.book}>
                  <div className={styles.image}>
                    <img src={imageBook} alt="imageBook" />
                  </div>
                  <div className={styles.title}>
                    <h4 style={currentThemeColor}>
                      A Mersey Killing: When Liverpool Rocked and the Music died
                    </h4>
                    <p style={currentThemeColor}>Brian L. Porter</p>
                  </div>
                </div>
                <div className={styles.book}>
                  <div className={styles.image}>
                    <img src={imageBook} alt="imageBook" />
                  </div>
                  <div className={styles.title}>
                    <h4 style={currentThemeColor}>
                      A Mersey Killing: When Liverpool Rocked and the Music died
                    </h4>
                    <p style={currentThemeColor}>Brian L. Porter</p>
                  </div>
                </div>
                <div className={styles.book}>
                  <div className={styles.image}>
                    <img src={imageBook} alt="imageBook" />
                  </div>
                  <div className={styles.title}>
                    <h4 style={currentThemeColor}>
                      A Mersey Killing: When Liverpool Rocked and the Music died
                    </h4>
                    <p style={currentThemeColor}>Brian L. Porter</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detail;
