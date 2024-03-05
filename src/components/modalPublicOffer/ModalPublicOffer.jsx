import React from 'react';

import styles from './ModalPublicOffer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCheckPublicOffer, setIsOpenModalPublicOffer } from '../../redux/slices/isTrue';

function ModalPublicOffer({ text, isCheck }) {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);
  const { isCheckPublicOffer } = useSelector((state) => state.isTrue);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsOpenModalPublicOffer(false));
    document.body.style.overflow = '';
  };

  const handleCheck = (e) => {
    dispatch(setIsCheckPublicOffer(e.target.checked));
  };

  return (
    <div onClick={closeModal} className={styles.window}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inner}>{text}</div>
        {isCheck && (
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name=""
              id="checkbox"
              onChange={handleCheck}
              checked={isCheckPublicOffer}
            />
            <label htmlFor="checkbox">Келишимге макулсузбу?</label>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalPublicOffer;
