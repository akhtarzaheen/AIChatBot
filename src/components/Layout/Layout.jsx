import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;