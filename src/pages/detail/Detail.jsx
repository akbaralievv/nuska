import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Detail.module.css';

import eBook from '../../assets/icons/detail/e-book.svg';
import imageBook from '../../assets/images/detail/imageBook.png';
import imageHome from '../../assets/images/card.png';
import favoriteDet from '../../assets/icons/detail/favoriteDet.svg';
import triangle from '../../assets/images/detail/triangle.png';
import triangleDark from '../../assets/images/detail/triangleDark.png';
import API_URLS from '../../config/api';
import { getBooks, getOneBook } from '../../redux/slices/book/getBooks';
import { getAuthors } from '../../redux/slices/getAuthors';
import Header from '../../components/header/Header';
import { getComments } from '../../redux/slices/book/getComments';
import { postComment } from '../../redux/slices/book/postComment';
import { getRefreshToken } from '../../components/helpers/tokens';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import { setIsOpenModal } from '../../redux/slices/isTrue';

function Detail() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: commentList } = useSelector((state) => state.getComments);
  const { isOpenModal } = useSelector((state) => state.isTrue);

  const api = API_URLS.oneBook;
  const [infoData, setInfoData] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [isErrorComment, setIsErrorComment] = useState(false);

  const { id } = useParams();
  const { data, loading, error, info } = useSelector((state) => state.getBooks);
  const { authors } = useSelector((state) => state.getAuthors);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getComments(id));
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    if (data) {
      const newApi = api + id;
      dispatch(getOneBook(newApi));
      dispatch(getAuthors());
    } else {
      dispatch(getBooks());
    }
  }, [data]);

  useEffect(() => {
    if (info) {
      setInfoData(info);
    }
  }, [info]);

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentValue.length > 2) {
      dispatch(postComment({ id, commentValue }));
      setCommentValue('');
      setIsErrorComment(false);
    } else {
      setIsErrorComment(true);
    }
  };

  const authorName = infoData?.author?.map((author) => `${author.first_name} ${author.last_name}`);

  return (
    <div className={styles.wrapper}>
      {isOpenModal && <ModalWindow message={'Вы не авторизованы!'} elementBtn={true} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <Header />
          <section className={styles.home}>
            <div className={styles.title}>
              <div className={styles.text}>
                <h2 style={currentThemeColor}>{infoData?.name}</h2>
                <p style={currentThemeColor}>{authorName}</p>
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
                <p style={currentThemeColor}>{infoData?.description}</p>
                <div className={styles.buttons}>
                  {infoData?.short_book_file && (
                    <a target="_blank" href={infoData?.short_book_file}>
                      Читать 15 стр
                    </a>
                  )}
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
                  {commentList.results?.map((comment, id) => (
                    <div className={styles.user} key={id}>
                      <div className={styles.title}>
                        <div className={styles.name}>
                          <div className={styles.img}></div>
                          {(comment.user_name && (
                            <h4 style={currentThemeColor}>{comment.user_name}</h4>
                          )) || <h4 style={currentThemeColor}>Lorem ipsum</h4>}
                        </div>
                        {comment.date && (
                          <span className={styles.date}>
                            {(() => {
                              const dateParts = comment.date.split('-');
                              return dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0];
                            })()}
                          </span>
                        )}
                      </div>
                      {comment.comment && (
                        <p className={styles.description} style={currentThemeColor}>
                          {comment.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <form className={styles.send} onSubmit={handleSubmitComment}>
                  <>
                    <textarea
                      id="review"
                      name="review"
                      rows="4"
                      cols="50"
                      placeholder="Оставить отзыв..."
                      style={currentThemeColor}
                      onChange={handleCommentChange}
                      value={commentValue}></textarea>
                    {isErrorComment && (
                      <p className={styles.errorComment}>
                        Комментарийлер кеминде 2 белгиден турушу керек
                      </p>
                    )}
                  </>
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
