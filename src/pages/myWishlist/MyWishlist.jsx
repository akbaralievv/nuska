import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './MyWishlist.module.css';
import basket from '../../assets/icons/basket.svg';
import basketBlack from '../../assets/icons/basketBlack.svg';
import image from '../../assets/images/detail/imageBook.png';
import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';
import { setIsFavorites, setIsOpenModal } from '../../redux/slices/isTrue';
import {
  clearDataRecommended,
  getRecommendedBooks,
} from '../../redux/slices/book/getRecommendedBooks';
import Paginate from '../../components/pagination/Pagination';
import Preloader from '../../components/preloader/Preloader';
import { getRefreshToken } from '../../components/helpers/tokens';
import ModalWindow from '../../components/modalWindow/ModalWindow';

function MyWishlist() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { isFavorites, isOpenModal } = useSelector((state) => state.isTrue);
  const { data: recommended, loading } = useSelector((state) => state.getRecommendedBooks);

  const [data, setData] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const pageCount = Math.ceil(recommended?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => recommended?.slice(indexOfFirstItem, indexOfLastItem),
    [recommended, indexOfFirstItem, indexOfLastItem],
  );

  const pageCountFavorites = Math.ceil(data?.length / itemsPerPage);
  const currentItemsFavorites = useMemo(
    () => data?.slice(indexOfFirstItem, indexOfLastItem),
    [data, indexOfFirstItem, indexOfLastItem],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
    return () => {
      dispatch(clearDataRecommended());
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('favorites')) || []);
    window.scrollTo(0, 0);
    if (data?.length === 0) {
      dispatch(getRecommendedBooks());
    }
  }, [isFavorites]);

  const favoriteDelete = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const filteredFavorites = favorites?.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify([...filteredFavorites]));
    dispatch(setIsFavorites(!isFavorites));

    const updatedPageCount = Math.ceil(filteredFavorites.length / itemsPerPage);
    if (currentPage > updatedPageCount) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1 || 1);
    }
  };

  const newFormatData = useCallback((str) => {
    const parts = str.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }, []);

  return (
    <div className={styles.wrapper}>
      {isOpenModal && (
        <ModalWindow message={'Сизге ыйгарым укук берилген эмес!'} elementBtn={true} />
      )}
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.menuHeader}>
              <Menu />
              <BurgerMenu />
            </div>
            <span>Менин тандоом</span>
          </header>
          {currentItemsFavorites?.length > 0 ? (
            <ul className={styles.content}>
              {currentItemsFavorites?.map((book) => (
                <li className={styles.book} key={book.id}>
                  <NavLink to={`/detail/${book.id}`}>
                    <div className={styles.image}>
                      <img src={book.cover_image ?? image} alt="image" />
                    </div>
                  </NavLink>
                  <div className={styles.title}>
                    <h3 style={currentThemeColor}>{book.name ?? 'Кылым карытар бир күн'}</h3>
                    <p style={currentThemeColor}>
                      {book.author[0].first_name || book.author[0].last_name
                        ? `${book.author[0].first_name} ${book.author[0].last_name}`
                        : 'Чынгыз Айтматов'}
                    </p>
                    <div className={styles.footer}>
                      <span>Сайтка киргизилген датасы {newFormatData(book.created_at)}</span>
                      <button style={currentThemeColor} onClick={() => favoriteDelete(book.id)}>
                        Алып салуу <img src={key === 'dark' ? basket : basketBlack} alt="basket" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.notFound}>
              <div className={styles.nothing}>
                <h2 style={currentThemeColor}>Тандаган китептердин тизмеси бош.</h2>
                <hr />
              </div>
              <h2 style={currentThemeColor}>Сунуштоо</h2>
              <ul className={styles.content}>
                {loading ? (
                  <Preloader style={{ height: 'calc(100vh - 531px)' }} />
                ) : currentItems?.length > 0 ? (
                  currentItems?.map((book) => (
                    <li className={styles.book} key={book.id}>
                      <div className={styles.image}>
                        <img src={book.cover_image ?? image} alt="image" />
                      </div>
                      <div className={styles.title}>
                        <h3 style={currentThemeColor}>{book.name ?? 'Кылым карытар бир күн'}</h3>
                        <p style={currentThemeColor}>
                          {book.author[0].first_name || book.author[0].last_name
                            ? `${book.author[0].first_name} ${book.author[0].last_name}`
                            : 'Чынгыз Айтматов'}
                        </p>
                        <div className={styles.footer}>
                          <span>Сайтка киргизилген датасы {newFormatData(book.created_at)}</span>
                          <NavLink to={`/detail/${book.id}`} style={currentThemeColor}>
                            Окуу
                          </NavLink>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={styles.nothing} style={currentThemeColor}>
                    Сунуштай турган китеп жок
                  </p>
                )}
              </ul>
              {recommended?.length > 4 && !loading && (
                <Paginate setCurrentPage={setCurrentPage} count={pageCount} page={currentPage} />
              )}
            </div>
          )}
          {data?.length > 4 && !loading && (
            <Paginate
              setCurrentPage={setCurrentPage}
              count={pageCountFavorites}
              page={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWishlist;
