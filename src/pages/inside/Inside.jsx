import React from 'react';
import { NavLink } from 'react-router-dom';

import BurgerMenu from '../../components/burgerMenu/BurgerMenu';

import styles from './Inside.module.css';
import zoomIn from '../../assets/icons/inside/zoom in.svg';
import zoomOut from '../../assets/icons/inside/zoom out.svg';
import bookmark from '../../assets/icons/inside/bookmark.svg';
import favoriteDet from '../../assets/icons/detail/favoriteDet.svg';
import Menu from '../../components/menu/Menu';

function Inside() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <Menu />
            <BurgerMenu />
            <div className={styles.zoom}>
              <div className={styles.zooms}>
                <div className={styles.zooms_inner}>
                  <img src={zoomIn} alt="zoomIn" />
                  <p>Zoom in</p>
                </div>
                <div className={styles.zooms_inner}>
                  <img src={zoomOut} alt="zoomOut" />
                  <p>Zoom out</p>
                </div>
              </div>
              <div className={styles.bookmark}>
                <img src={bookmark} alt="bookmark" />
              </div>
              <p className={styles.count}>4/215</p>
            </div>
            <nav className={styles.navbar}>
              <NavLink className={styles.buy}>Buy this book</NavLink>
              <button className={styles.add}>
                <img src={favoriteDet} alt="favoriteDet" />
                <span>Add to wishlist</span>
              </button>
            </nav>
          </header>
          <section className={styles.content}>
            <div className={styles.reader}>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
              </p>
              <hr />
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
              </p>
            </div>
            <div className={styles.paginate}>
              <div className={styles.previous}>
                <button>Previous page</button>
                <p>3</p>
              </div>
              <div className={styles.next}>
                <p>4</p>
                <button>Next page</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Inside;
