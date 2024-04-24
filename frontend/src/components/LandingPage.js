import React from 'react';
import styles from '../styles/LandingPage.module.css';

const StartPage = () => {
  return (
    <div className={styles["start-page_container"]}>
      <div className={styles["start-page"]}>
        <div className={styles["logo"]}>
          <img src="/LQLogo.png" alt="LitQuest Logo" />
        </div>
        <h1>Welcome to LitQuest</h1>
        <p>Manage your book list with ease</p>
        <p>Find your next literary adventure efficiently</p>
      </div>
    </div>
  );
};

export default StartPage;