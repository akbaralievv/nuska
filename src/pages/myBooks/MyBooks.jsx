import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MyBooks.module.css';
import image from '../../assets/images/detail/imageBook.png';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';
import Paginate from '../../components/pagination/Pagination';
import {
  clearDataRecommended,
  getRecommendedBooks,
} from '../../redux/slices/book/getRecommendedBooks';
import Preloader from '../../components/preloader/Preloader';
import {
  clearDataPurchasedBooks,
  getPurchasedBooks,
} from '../../redux/slices/book/getPurchasedBooks';
import { getRefreshToken } from '../../components/helpers/tokens';
import { setIsOpenModal } from '../../redux/slices/isTrue';
import ModalWindow from '../../components/modalWindow/ModalWindow';

function MyBooks() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: myBooks, loading, error } = useSelector((state) => state.getPurchasedBooks);
  const { data: recommended, loading: recommendedLoad } = useSelector(
    (state) => state.getRecommendedBooks,
  );
  const { isOpenModal } = useSelector((state) => state.isTrue);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 4;
  const pageCountMyBooks = Math.ceil(myBooks?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsMyBooks = useMemo(
    () => myBooks?.slice(indexOfFirstItem, indexOfLastItem),
    [myBooks, indexOfFirstItem, indexOfLastItem],
  );

  const pageCountRecommended = Math.ceil(recommended?.length / itemsPerPage);
  const currentItemsRecommended = useMemo(
    () => recommended?.slice(indexOfFirstItem, indexOfLastItem),
    [recommended, indexOfFirstItem, indexOfLastItem],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPurchasedBooks());
    dispatch(getRecommendedBooks());
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
    return () => {
      dispatch(clearDataPurchasedBooks());
      dispatch(clearDataRecommended());
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (recommended.length > 0 || myBooks.length > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [recommended, myBooks]);

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
            <span>Китептерим</span>
          </header>
          {!isLoading ? (
            <Preloader style={{ height: 'calc(100vh - 531px)' }} />
          ) : currentItemsMyBooks?.length > 0 ? (
            <ul className={styles.content}>
              {currentItemsMyBooks?.map((book) => (
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
                <h2 style={currentThemeColor}>Китеп тизмеси бош.</h2>
                <hr />
              </div>
              <h2 style={currentThemeColor}>Сунуштоо</h2>
              <ul className={styles.content}>
                {currentItemsRecommended?.length > 0 ? (
                  currentItemsRecommended?.map((book) => (
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
                  <p className={styles.notFound} style={currentThemeColor}>
                    Сунуштай турган китеп жок
                  </p>
                )}
              </ul>
              {recommended?.length > 4 && !recommendedLoad && (
                <Paginate
                  setCurrentPage={setCurrentPage}
                  count={pageCountRecommended}
                  page={currentPage}
                />
              )}
            </div>
          )}
          {myBooks?.length > 4 && !loading && (
            <Paginate setCurrentPage={setCurrentPage} count={pageCountMyBooks} page={currentPage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBooks;
