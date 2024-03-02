import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import search from '../../assets/icons/search icon.svg';
import close from '../../assets/icons/closeSearch.svg';
import styles from './Header.module.css';

import { setIsAuth } from '../../redux/slices/isTrue';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import Menu from '../menu/Menu';
import { isUserAuthenticated } from '../helpers/isUserAuthenticated';
import { setSearch } from '../../redux/slices/searchBook';

const Header = React.memo(({ isSearch }) => {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data, loading, error } = useSelector((state) => state.getBooks);
  const { isLogout } = useSelector((state) => state.isTrue);
  const { searchValue } = useSelector((state) => state.searchBook);

  const [isAuthLog, setIsAuthLog] = useState(isUserAuthenticated());
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [searchBook, setSearchBook] = useState([]);
  const [keepListVisible, setKeepListVisible] = useState(false);

  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const navigate = useNavigate();

  const handleAuthClick = (e) => {
    dispatch(setIsAuth(e));
  };

  useEffect(() => {
    const result =
      searchValue.trim() &&
      data?.filter((book) => book.name.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchBook(result);
  }, [searchValue]);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 1000),
    [],
  );

  const onClickClear = () => {
    dispatch(setSearch(''));
    setValue('');
    inputRef.current.focus();
  };

  const handleChangeSearch = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!keepListVisible) {
        setIsFocused(false);
      }
    }, 0);
  };

  const styleInput = { ...currentThemeColor, paddingLeft: isFocused ? '0' : '61px' };
  useEffect(() => {
    setIsAuthLog(isUserAuthenticated());
  }, [isLogout]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Menu />
          <BurgerMenu />
          <nav className={styles.nav}>
            {!isAuthLog && (
              <>
                <NavLink
                  to="/auth"
                  className={styles.auth}
                  onClick={() => handleAuthClick(true)}
                  style={currentThemeColor}>
                  Кирүү
                </NavLink>
                <NavLink
                  to="/auth"
                  className={styles.auth}
                  onClick={() => handleAuthClick(false)}
                  style={currentThemeColor}>
                  Катталуу
                </NavLink>
              </>
            )}
            {!isSearch && (
              <div className={styles.search}>
                <img src={search} alt="search" style={{ display: isFocused ? 'none' : 'block' }} />
                <input
                  type="text"
                  placeholder="Издөө"
                  ref={inputRef}
                  onChange={handleChangeSearch}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={styleInput}
                  value={value}
                />
                {value && (
                  <img className={styles.clearIcon} src={close} alt="logo" onClick={onClickClear} />
                )}
                {searchBook?.length > 0 && isFocused && (
                  <ul
                    className={styles.searchSelect}
                    onMouseEnter={() => setKeepListVisible(true)}
                    onMouseLeave={() => setKeepListVisible(false)}>
                    {searchBook?.map((book) => (
                      <li key={book.id} onClick={() => navigate(`/detail/${book.id}`)}>
                        <p>{book.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
});

export default Header;
