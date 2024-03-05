import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AuthorDetail.module.css';

import one from '../../assets/icons/detail/1.svg';
import two from '../../assets/icons/detail/2.svg';
import three from '../../assets/icons/detail/3.svg';
import four from '../../assets/icons/detail/4.svg';
import eBook from '../../assets/icons/detail/e-book.svg';
import API_URLS from '../../config/api';
import { clearDataInfo, getBooks, getOneBook } from '../../redux/slices/book/getBooks';
import Header from '../../components/header/Header';
import { getComments } from '../../redux/slices/book/getComments';
import { postComment } from '../../redux/slices/book/postComment';
import { getRefreshToken } from '../../components/helpers/tokens';
import ModalWindow from '../../components/modalWindow/ModalWindow';
import { setIsOpenModal } from '../../redux/slices/isTrue';
import { getRecommendedBooks } from '../../redux/slices/book/getRecommendedBooks';

function AuthorDetail() {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { data: commentList } = useSelector((state) => state.getComments);
  const { isOpenModal } = useSelector((state) => state.isTrue);
  const { data: recommended, loading: recommendedLoad } = useSelector(
    (state) => state.getRecommendedBooks,
  );

  const api = API_URLS.oneBook;
  const [infoData, setInfoData] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [isErrorComment, setIsErrorComment] = useState(false);

  const { id } = useParams();
  const { data, loading, error, info } = useSelector((state) => state.getBooks);

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
    return () => {
      dispatch(clearDataInfo());
      dispatch(setIsOpenModal(false));
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (data) {
      const newApi = api + id;
      dispatch(getOneBook(newApi));
      dispatch(getRecommendedBooks());
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

  function renderPeople(peopleArray) {
    let names = [];
    peopleArray?.forEach((person) => {
      let fullName = `${person.first_name} ${person.last_name}`;
      names.push(fullName);
    });
    return names?.join(', ');
  }

  const authorName = infoData?.author?.map((author) => `${author.first_name} ${author.last_name}`);

  return (
    <div className={styles.wrapper}>
      {isOpenModal && (
        <ModalWindow message={'Сизге ыйгарым укук берилген эмес!'} elementBtn={true} />
      )}
      <div className={styles.container}>
        <div className={styles.inner}>
          <Header isSearch={true} />
          <section className={styles.home}>
            <div className={styles.title}>
              <div className={styles.text}>
                <h2 style={currentThemeColor}>{infoData?.name}</h2>
              </div>
              <p style={currentThemeColor}>{renderPeople(infoData?.author)}</p>
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
                    <span>Менин</span>
                    <p style={currentThemeColor}>Авторлугум</p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  {infoData?.short_book_file && (
                    <a target="_blank" href={infoData?.short_book_file} style={currentThemeColor}>
                      Окуу
                    </a>
                  )}
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
            </div>
            <div className={styles.salesInfo}>
              <h3>Сатуулар жөнүндө маалымат</h3>
              <ul className={styles.content}>
                <li>
                  <img src={one} alt="" />
                  <p>Акыркы сатылган 5 китептин датасы</p>
                  <ul>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                  </ul>
                </li>
                <li>
                  <img src={two} alt="" />
                  <p>Жалпы сатылган сумма</p>
                  <ul>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                  </ul>
                </li>
                <li>
                  <img src={three} alt="" />
                  <p>Акыркы 5 төлөмдун датасы</p>
                  <ul>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                  </ul>
                </li>
                <li>
                  <img src={four} alt="" />
                  <p>Авторго төлөмдүн жалпы суммасы</p>
                  <ul>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                    <li>12/12/1212</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetail;
