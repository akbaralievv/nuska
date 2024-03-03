import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Detail.module.css';

import eBook from '../../assets/icons/detail/e-book.svg';
import imageBook from '../../assets/images/detail/imageBook.png';
import imageHome from '../../assets/images/card.png';
import favoriteDet from '../../assets/icons/detail/favoriteDet.svg';
import favorite from '../../assets/icons/favorite.svg';
import favoriteLight from '../../assets/icons/favorite light.svg';
import favoriteSelect from '../../assets/icons/favoriteSelect.svg';
import favoriteSelectLight from '../../assets/icons/favoriteSelect light.svg';
import triangle from '../../assets/images/detail/triangle.png';
import triangleDark from '../../assets/images/detail/triangleDark.png';
import API_URLS from '../../config/api';
import { clearDataInfo, getBooks, getOneBook } from '../../redux/slices/book/getBooks';
import { clearDataAuthors, getAuthors } from '../../redux/slices/getAuthors';
import Header from '../../components/header/Header';
import { clearDataComments, getComments } from '../../redux/slices/book/getComments';
import { postComment } from '../../redux/slices/book/postComment';
import { getRefreshToken } from '../../components/helpers/tokens';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import { setIsFavorites, setIsOpenModal } from '../../redux/slices/isTrue';
import {
  clearDataRecommended,
  getRecommendedBooks,
} from '../../redux/slices/book/getRecommendedBooks';
import DetailBookCard from '../../components/detailBookCard/DetailBookCard';
import PreloadBtn from '../../components/PreloadBtn/PreloadBtn';
import Preloader from '../../components/preloader/Preloader';

function Detail() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: commentList } = useSelector((state) => state.getComments);
  const { isOpenModal, isDetailCard } = useSelector((state) => state.isTrue);
  const { data: recommended, loading: recommendedLoad } = useSelector(
    (state) => state.getRecommendedBooks,
  );
  const { data: createCommentData, loading: createCommentLoad } = useSelector(
    (state) => state.postComment,
  );

  const api = API_URLS.oneBook;
  const [infoData, setInfoData] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [isErrorComment, setIsErrorComment] = useState(false);
  const [like, setLike] = useState(false);

  const { id } = useParams();
  const { data, loading, error, info, oneBookLoad } = useSelector((state) => state.getBooks);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearDataAuthors());
      dispatch(clearDataRecommended());
      dispatch(clearDataComments());
      dispatch(clearDataInfo());
    };
  }, []);

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
    return () => {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, [createCommentData]);

  useEffect(() => {
    if (data) {
      const newApi = api + id;
      dispatch(getOneBook(newApi));
      dispatch(getRecommendedBooks());
    } else {
      dispatch(getBooks());
    }
  }, [data, isDetailCard]);

  useEffect(() => {
    if (info) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isLiked = favorites?.find((favorite) => favorite.id === info?.id);
      setLike(isLiked);
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

  const handleLike = () => {
    localUpdate(!like);
    setLike(!like);
  };

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
      const existingIndex = favorites?.findIndex((favorite) => favorite.id === info?.id);
      if (existingIndex === -1) {
        updatedFavorites = [...favorites, info];
      }
    } else {
      const filteredFavorites = favorites?.filter((favorite) => favorite.id !== info?.id);
      updatedFavorites = [...filteredFavorites];
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteText = () => {
    if (like) {
      return 'Тандоодон алуу';
    } else {
      return 'Тандоо';
    }
  };

  const authorName = infoData?.author?.map((author) => `${author.first_name} ${author.last_name}`);

  return (
    <div className={styles.wrapper}>
      {isOpenModal && (
        <ModalWindow message={'Сизге ыйгарым укук берилген эмес!'} elementBtn={true} />
      )}
      <div className={styles.container}>
        <div className={styles.inner}>
          <Header isSearch={true} />
          {oneBookLoad ? (
            <Preloader style={{ height: 'calc(100vh - 531px)' }} />
          ) : (
            <>
              <section className={styles.home}>
                <div className={styles.title}>
                  <div className={styles.text}>
                    <h2 style={currentThemeColor}>{infoData?.name}</h2>
                  </div>
                  <p style={currentThemeColor}>{authorName}</p>
                  <div className={styles.infoNumbers}>
                    <div className={styles.infoNumbers_inner}>
                      <div className={styles.info}>
                        <img src={eBook} alt="eBook" />
                        <p style={currentThemeColor}>e-китеп</p>
                      </div>
                      <div className={styles.info}>
                        <span>{infoData?.amount_pages}</span>
                        <p style={currentThemeColor}>Барактардын саны</p>
                      </div>
                      <div className={styles.info}>
                        <span>300c</span>
                        <p style={currentThemeColor}>Баасы</p>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      {infoData?.short_book_file && (
                        <a target="_blank" href={infoData?.short_book_file}>
                          15 бет үзүндүү
                        </a>
                      )}
                      <button className={styles.green} style={currentThemeColor}>
                        Сатып алуу
                      </button>
                      <button onClick={handleLike}>
                        <img src={favoriteDet} alt="favorite" />
                        <span>{favoriteText()}</span>
                      </button>
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
                    <h3>Китеп жөнүндө</h3>
                    <p style={currentThemeColor}>{infoData?.description}</p>
                  </div>
                  <div
                    className={styles.available}
                    style={
                      key === 'light'
                        ? { border: '3px solid #404040' }
                        : { border: '3px solid #5CC11F' }
                    }>
                    <h4 style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                      Бул жерде нускасы сатылат:
                    </h4>
                    <div className={styles.infos}>
                      <div className={styles.info}>
                        <p style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                          Дарек:
                        </p>
                        <p style={key === 'light' ? { color: '#404040' } : { color: 'white' }}>
                          Бишкек, 1
                        </p>
                      </div>
                      <div className={styles.info}>
                        <p style={key === 'light' ? { color: '#404040' } : { color: '#5CC11F' }}>
                          Телефон:
                        </p>
                        <p style={key === 'light' ? { color: '#404040' } : { color: 'white' }}>
                          +996700123456
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
                      Жеткиликтүү эмес
                    </span>
                  </div>
                  <div className={styles.reviews}>
                    <h3>Пикирлер</h3>
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
                          placeholder="Пикир калтыруу..."
                          style={currentThemeColor}
                          onChange={handleCommentChange}
                          value={commentValue}></textarea>
                        {isErrorComment && (
                          <p className={styles.errorComment}>
                            Комментарийлер кеминде 2 же андан ашык белгиден турушу керек
                          </p>
                        )}
                      </>
                      <button type="submit" style={currentThemeColor} disabled={createCommentLoad}>
                        {createCommentLoad ? <PreloadBtn /> : 'Жөнөтүү'}
                      </button>
                    </form>
                  </div>
                </div>
                <div className={styles.other}>
                  <h3>Сунуштоо</h3>
                  <div className={styles.books}>
                    {recommended?.map((book) => (
                      <DetailBookCard book={book} key={book.id} />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
