import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MyAccount.module.css';
import languages from '../../assets/icons/menu/language.svg';
import user from '../../assets/icons/menu/account.svg';
import email from '../../assets/icons/menu/emailAcc.svg';
import lock from '../../assets/icons/menu/lockAcc.svg';
import author from '../../assets/icons/menu/authorAcc.svg';
import phone from '../../assets/icons/menu/phoneAcc.svg';
import kyrgyz from '../../assets/icons/account/kyrgyz.svg';
import russian from '../../assets/icons/account/russian.svg';
import english from '../../assets/icons/account/english.svg';

import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';
import { clearDataUser, getUser } from '../../redux/slices/user/getUser';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../components/helpers/tokens';
import { setIsLogout, setIsOpenMenu, setIsOpenModal } from '../../redux/slices/isTrue';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import { setLanguage } from '../../redux/slices/changeLanguage';
import { clearDataDeleteUser, deleteAccount } from '../../redux/slices/user/deleteAccount';
import PreloadBtn from '../../components/PreloadBtn/PreloadBtn';
import { NavLink } from 'react-router-dom';
import { clearDataPatchUser, patchUsername } from '../../redux/slices/user/patchUsername';
import Preloader from '../../components/preloader/Preloader';

function MyAccount() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { language } = useSelector((state) => state.changeLanguage);
  const { isOpenModal } = useSelector((state) => state.isTrue);
  const { data, loading } = useSelector((state) => state.getUser);
  const { data: deleteData, loading: deleteLoading } = useSelector((state) => state.deleteAccount);
  const { data: changedUserData, loading: changedUserLoading } = useSelector(
    (state) => state.patchUsername,
  );

  const [changeAcc, setChangeAcc] = useState({
    language: false,
    deleteAccount: false,
    logout: false,
  });
  const [nameValue, setNameValue] = useState({
    first_name: '',
    last_name: '',
  });
  const [isChanged, setIsChanged] = useState(false);
  const [errorValid, setErrorValid] = useState(false);

  const dispatch = useDispatch();

  const handleClickLanguage = (languageStr) => {
    typeof languageStr === 'string' && dispatch(setLanguage(languageStr));
    setChangeAcc((prev) => ({ ...changeAcc, language: !changeAcc.language }));
  };

  const handleClickDeleteAcc = (isDelete) => {
    if (typeof isDelete === 'boolean') {
      dispatch(deleteAccount(data.id));
    }
    setChangeAcc((prev) => ({ ...changeAcc, deleteAccount: !changeAcc.deleteAccount }));
  };

  const handleClickLogout = (isLogout) => {
    if (typeof isLogout === 'boolean') {
      dispatch(setIsOpenMenu(false));
      dispatch(setIsLogout(true));
      removeAccessToken();
      removeRefreshToken();
      window.scrollTo(0, 0);
    }
    setChangeAcc((prev) => ({ ...changeAcc, logout: !changeAcc.logout }));
  };

  const validateName = (name) => {
    const re = /^[a-zA-Zа-яА-Я-]+$/;
    return re.test(String(name));
  };

  const handleChangeName = (e) => {
    setIsChanged(true);
    const value = e.target.value?.split(' ');
    if (value.length === 2 && validateName(value[0]) && validateName(value[1])) {
      setNameValue((prev) => ({ ...prev, last_name: value[0], first_name: value[1] }));
    }
  };

  const handleClickSave = () => {
    if (isChanged) {
      if (nameValue.first_name && nameValue.last_name) {
        setErrorValid(false);
        dispatch(patchUsername(nameValue));
      } else {
        setErrorValid(true);
      }
    }
  };

  const deleteAccountUser = () => {};

  useEffect(() => {
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
    return () => {
      dispatch(clearDataDeleteUser());
      dispatch(clearDataPatchUser());
      dispatch(clearDataUser());
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!getRefreshToken()) {
      dispatch(setIsOpenModal(true));
      document.body.style.overflow = 'hidden';
      dispatch(setIsLogout(false));
    } else {
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    }
  }, [deleteData]);

  useEffect(() => {
    dispatch(getUser());
    window.scrollTo(0, 0);
  }, [changedUserData]);

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
            <span>Аккаунт</span>
          </header>
          {loading ? (
            <Preloader style={{ height: 'calc(100vh - 531px)' }} />
          ) : (
            <div className={styles.content}>
              <div className={styles.username}>
                {(data.lastname || data.first_name) && (
                  <h2>
                    {data.last_name} {data.first_name}
                  </h2>
                )}
                {data.email && <p style={currentThemeColor}>{data.email}</p>}
              </div>
              <div className={styles.editProfile}>
                <p className={styles.title} style={currentThemeColor}>
                  Профилди оңдоо
                </p>
                <div className={styles.forms}>
                  <ul
                    className={styles.form}
                    style={{
                      borderTop: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                      borderBottom: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                    }}>
                    <li>
                      <p style={currentThemeColor}>
                        <img src={user} alt="user" />
                        Аты-жөнү
                      </p>
                      <div className={styles.container_input}>
                        <input
                          type="text"
                          defaultValue={
                            data.lastname || data.first_name
                              ? `${data.last_name} ${data.first_name}`
                              : ''
                          }
                          onChange={handleChangeName}
                          style={{
                            border: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                            color: `${key === 'light' ? '#000' : '#fff'}`,
                          }}
                        />
                        {errorValid && (
                          <p className={styles.error}>
                            Сураныч, жарактуу атын киргизиңиз (Фамилиясы Аты).
                          </p>
                        )}
                      </div>
                    </li>
                    <li>
                      <p style={currentThemeColor}>
                        <img src={email} alt="email" />
                        Email дарек
                      </p>
                      {data.email && <p style={currentThemeColor}>{data.email}</p>}
                    </li>
                  </ul>
                  <ul
                    className={styles.form}
                    style={{
                      borderTop: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                      borderBottom: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                    }}>
                    <li className={styles.changeLi}>
                      <p style={currentThemeColor}>
                        <img src={languages} alt="languages" />
                        Тил
                      </p>
                      <div className={styles.change}>
                        <p style={currentThemeColor}>{language}</p>
                        {changeAcc.language ? (
                          <div className={styles.languageSelect}>
                            <button onClick={() => handleClickLanguage('Кыргызча')}>
                              <img src={kyrgyz} alt="kyrgyz" />
                              <span className={`${language === 'Кыргызча' ? styles.select : ''}`}>
                                Кыргызча
                              </span>
                            </button>
                            <button onClick={() => handleClickLanguage('Русский')}>
                              <img src={russian} alt="russian" />
                              <span className={`${language === 'Русский' ? styles.select : ''}`}>
                                Русский
                              </span>
                            </button>
                            <button onClick={() => handleClickLanguage('English')}>
                              <img src={english} alt="english" />
                              <span className={`${language === 'English' ? styles.select : ''}`}>
                                English
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button style={currentThemeColor} onClick={handleClickLanguage}>
                            Тилди алмаштыруу
                          </button>
                        )}
                      </div>
                    </li>
                    <li className={styles.changeLi}>
                      <p style={currentThemeColor}>
                        <img src={author} alt="author" />
                        Аккаунт
                      </p>
                      <div className={styles.change}>
                        {changeAcc.deleteAccount ? (
                          <div className={styles.popupDelete}>
                            <h4>Аккаунтту жок кылуу?</h4>
                            <p onClick={deleteAccountUser}>Аккаунтту жок кылууга макулсузбу?</p>
                            <div className={styles.btns}>
                              <button onClick={handleClickDeleteAcc}>Баш тартуу</button>
                              <button
                                onClick={() => handleClickDeleteAcc(true)}
                                disabled={deleteLoading}>
                                {deleteLoading ? <PreloadBtn /> : 'Жок кылуу'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            style={{
                              ...currentThemeColor,
                              borderColor: `${key === 'dark' ? '#fff' : '#000'}`,
                            }}
                            onClick={handleClickDeleteAcc}
                            className={styles.deleteAccBtn}>
                            Аккаунтту жок кылуу
                          </button>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={styles.buttons}>
                  <button
                    style={currentThemeColor}
                    onClick={handleClickSave}
                    disabled={changedUserLoading}>
                    {changedUserLoading ? <PreloadBtn /> : 'Өзгөрүүлөрдү сактоо'}
                  </button>
                  {changeAcc.logout ? (
                    <div className={styles.popupDelete}>
                      <h4>Чыгуу?</h4>
                      <p>Чыгууну каалайсызбы?</p>
                      <div className={styles.btns}>
                        <button onClick={handleClickLogout}>Баш тартуу</button>
                        <NavLink to={'/'} onClick={() => handleClickLogout(true)}>
                          Чыгуу
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <button style={currentThemeColor} onClick={handleClickLogout}>
                      Чыгуу
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
