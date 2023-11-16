import React from 'react';

import styles from './MyWishlist.module.css';
import basket from '../../assets/icons/basket.svg';
import image from '../../assets/images/detail/imageBook.png';

function MyWishlist() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.inner}>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3>A Mersey Killing: When Liverpool Rocked and the Music died</h3>
              <p>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button>
                  Remove <img src={basket} alt="basket" />
                </button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3>A Mersey Killing: When Liverpool Rocked and the Music died</h3>
              <p>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button>
                  Remove <img src={basket} alt="basket" />
                </button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3>A Mersey Killing: When Liverpool Rocked and the Music died</h3>
              <p>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button>
                  Remove <img src={basket} alt="basket" />
                </button>
              </div>
            </div>
          </li>
          <li className={styles.book}>
            <div className={styles.image}>
              <img src={image} alt="image" />
            </div>
            <div className={styles.title}>
              <h3>A Mersey Killing: When Liverpool Rocked and the Music died</h3>
              <p>Brian L. Porter</p>
              <div className={styles.footer}>
                <span>Added on 12/12/2023</span>
                <button>
                  Remove <img src={basket} alt="basket" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyWishlist;
