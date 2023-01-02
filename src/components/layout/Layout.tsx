import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './Layout.module.css'

export const Layout = () => {
  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to="/">Home</Link>
          </li>
          
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};
