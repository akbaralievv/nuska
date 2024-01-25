import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MyAccount.module.css';
import languages from '../../assets/icons/menu/language.svg';
import user from '../../assets/icons/menu/account.svg';
import email from '../../assets/icons/menu/emailAcc.svg';
import lock from '../../assets/icons/menu/lockAcc.svg';
import author from '../../assets/icons/menu/authorAcc.svg';
import phone from '../../assets/icons/menu/phoneAcc.svg';

import Menu from '../../components/menu/Menu';
import BurgerMenu from '../../components/burgerMenu/BurgerMenu';
import { getUser } from '../../redux/slices/user/getUser';
import { getRefreshToken } from '../../components/helpers/tokens';
import { setIsOpenModal } from '../../redux/slices/isTrue';
import ModalWindow from '../../components/modalWindow/ModalWindow';

function MyAccount() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { isOpenModal } = useSelector((state) => state.isTrue);
  const { data } = useSelector((state) => state.getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    window.scrollTo(0, 0);
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
  }, []);

  return (
    <div className={styles.wrapper}>
      {isOpenModal && <ModalWindow message={'Вы не авторизованы!'} elementBtn={true} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.menuHeader}>
              <Menu />
              <BurgerMenu />
            </div>
            <span>Аккаунт</span>
          </header>
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
                    <input
                      type="text"
                      defaultValue={
                        data.lastname || data.first_name
                          ? `${data.last_name} ${data.first_name}`
                          : ''
                      }
                      style={{
                        border: `${key === 'light' ? '1px solid #000' : '1px solid #fff'}`,
                        color: `${key === 'light' ? '#000' : '#fff'}`,
                      }}
                    />
                  </li>
                  <li>
                    <p style={currentThemeColor}>
                      <img src={email} alt="email" />
                      Email дарек
                    </p>
                    {data.email && <p style={currentThemeColor}>{data.email}</p>}
                  </li>
                  {/* <li className={styles.changeLi}>
                    <p style={currentThemeColor}>
                      <img src={lock} alt="lock" />
                      Password
                    </p>
                    <div className={styles.change}>
                      <p style={currentThemeColor}>XXXXXXXX</p>
                      <button style={currentThemeColor}>Change password</button>
                    </div>
                  </li> */}
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
                      <p style={currentThemeColor}>English</p>
                      <button style={currentThemeColor}>Тилди алмаштыруу</button>
                    </div>
                  </li>
                  <li className={styles.changeLi}>
                    <p style={currentThemeColor}>
                      <img src={author} alt="author" />
                      Аккаунт
                    </p>
                    <div className={styles.change}>
                      <p></p>
                      <button style={currentThemeColor}>Аккаунтту жок кылуу</button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.buttons}>
                <button style={currentThemeColor}>Чыгуу</button>
                <button style={currentThemeColor}>Өзгөрүүлөрдү сактоо</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
