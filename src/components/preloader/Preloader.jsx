import React from 'react';

import styles from './Preloader.module.css';

const Preloader = React.memo(({ style }) => {
  return (
    <div className={styles.spinWrapper} style={style}>
      <div className={styles.spinner}></div>
    </div>
  );
});

export default Preloader;
