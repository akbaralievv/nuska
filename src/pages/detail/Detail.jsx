import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css';
import eBook from '../../assets/icons/detail/e-book.svg';
import imageBook from '../../assets/images/detail/imageBook.png';
import imageHome from '../../assets/images/card.png';
import favoriteDet from '../../assets/icons/detail/favoriteDet.svg';
import triangle from '../../assets/images/detail/triangle.png';
import triangleDark from '../../assets/images/detail/triangleDark.png';
import API_URLS from '../../config/api';
import getBooks, { getOneBook } from '../../redux/slices/getBooks';
import { getAuthors } from '../../redux/slices/getAuthors';

function Detail()
{
  const [infoData, setInfoData] = useState(null)
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const api = API_URLS.oneBook;
  const { id } = useParams()
  const { data, loading, error, info } = useSelector((state) => state.getBooks);
  const { authors } = useSelector((state) => state.getAuthors);
  const dispatch = useDispatch()
  useEffect(() =>
  {
    window.scrollTo(0, 0);

  }, [])
  useEffect(() =>
  {
    console.log(data);
    if (data) {
      const newApi = api + id;
      dispatch(getOneBook(newApi));
      dispatch(getAuthors())
    }
    else {
      dispatch(getBooks())
    }
  }, [data])
  useEffect(() =>
  {
    if (info) {
      setInfoData(info)
      console.log(info);
    }
  }, [info])
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.home}>
            <div className={styles.title}>
              <div className={styles.text}>
                <h2 style={currentThemeColor}>
                  {infoData?.name}
                </h2>
                <p style={currentThemeColor}>{infoData?.author && authors && authors[infoData?.author]}</p>
              </div>
              <div className={styles.infoNumbers}>
                <div className={styles.info}>
                  <img src={infoData?.avatar} alt="eBook" />
                  <p style={currentThemeColor}>e-book</p>
                </div>
                <div className={styles.info}>
                  <span>{infoData?.amount_pages}</span>
                  <p style={currentThemeColor}>Количество страниц</p>
                </div>
                <div className={styles.info}>
                  <span>300c</span>
                  <p style={currentThemeColor}>Цена</p>
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <img src={infoData?.cover_image} alt="imageHome" />
            </div>
          </section>
          <section className={styles.about}>
            <div className={styles.this}>
              <div className={styles.aboutBook}>
                <h3>About this book</h3>
                <p style={currentThemeColor}>
                  {infoData?.description}
                </p>
                <div className={styles.buttons}>
                  {
                    infoData?.short_book_file &&
                    <a target='_blank' href={infoData?.short_book_file}>Читать 15 стр</a>
                  }
                  <button className={styles.green} style={currentThemeColor}>
                    Buy this book
                  </button>
                  <button>
                    <img src={infoData?.cover_image} alt="favorite" />
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
