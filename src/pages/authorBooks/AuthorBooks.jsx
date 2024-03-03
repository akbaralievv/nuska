import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import basket from '../../assets/icons/basket.svg';
import basketBlack from '../../assets/icons/basketBlack.svg';
import styles from './AuthorBooks.module.css';
import image from '../../assets/images/detail/imageBook.png';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';
import { getAuthorBooks, clearDataAuthorBook } from '../../redux/slices/book/getAuthorBooks';
import Paginate from '../../components/pagination/Pagination';
import {
  clearDataRecommended,
  getRecommendedBooks,
} from '../../redux/slices/book/getRecommendedBooks';
import Preloader from '../../components/preloader/Preloader';
import { getRefreshToken } from '../../components/helpers/tokens';
import { setIsOpenModal } from '../../redux/slices/isTrue';
import ModalWindow from '../../components/modalWindow/ModalWindow';

function AuthorBooks() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: AuthorBooks, loading, error } = useSelector((state) => state.getAuthorBooks);
  const { data: recommended, loading: recommendedLoad } = useSelector(
    (state) => state.getRecommendedBooks,
  );
  const { isOpenModal } = useSelector((state) => state.isTrue);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const pageCountAuthorBooks = Math.ceil(AuthorBooks?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsAuthorBooks = useMemo(
    () => AuthorBooks?.slice(indexOfFirstItem, indexOfLastItem),
    [AuthorBooks, indexOfFirstItem, indexOfLastItem],
  );

  const pageCountRecommended = Math.ceil(recommended?.length / itemsPerPage);
  const currentItemsRecommended = useMemo(
    () => recommended?.slice(indexOfFirstItem, indexOfLastItem),
    [recommended, indexOfFirstItem, indexOfLastItem],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAuthorBooks());
    dispatch(getRecommendedBooks());
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
    return () => {
      dispatch(clearDataRecommended());
      dispatch(clearDataAuthorBook());
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, []);

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
            <span>Авторлугум</span>
          </header>
          {AuthorBooks?.length === 0 && recommended?.length === 0 ? (
            <Preloader style={{ height: 'calc(100vh - 531px)' }} />
          ) : currentItemsAuthorBooks?.length > 0 ? (
            <ul className={styles.content}>
              {currentItemsAuthorBooks?.map((book) => (
                <li className={styles.book} key={book.id}>
                  <NavLink to={`/authorDetail/${book.id}`}>
                    <div className={styles.image}>
                      <img src={book.cover_image ?? image} alt="image" />
                    </div>
                  </NavLink>
                  <div className={styles.title}>
                    <h3 style={currentThemeColor}>{book.name ?? 'Кылым карытар бир күн'}</h3>
                    {/* <p style={currentThemeColor}>
                      {book.author[0].first_name || book.author[0].last_name
                        ? `${book.author[0].first_name} ${book.author[0].last_name}`
                        : 'Чынгыз Айтматов'}
                    </p> */}
                    <div className={styles.footer}>
                      {/* <span>Сайтка киргизилген датасы {newFormatData(book?.created_at)}</span> */}
                      <NavLink to={`/detail/${book.id}`} style={currentThemeColor}>
                        Окуу
                      </NavLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.notFound}>
              <div className={styles.nothing}>
                <h2 style={currentThemeColor}>Автордук китеп тизмеси бош.</h2>
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
                          {/* <span>Сайтка киргизилген датасы {newFormatData(book.created_at)}</span> */}
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
              {recommended?.length > 4 && !recommendedLoad && !loading && (
                <Paginate
                  setCurrentPage={setCurrentPage}
                  count={pageCountRecommended}
                  page={currentPage}
                />
              )}
            </div>
          )}
          {AuthorBooks?.length > 4 && !recommendedLoad && !loading && (
            <Paginate
              setCurrentPage={setCurrentPage}
              count={pageCountAuthorBooks}
              page={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorBooks;
