import React from 'react';
import '../styles/LandingPage.module.css'; // Path to your CSS file

const StartPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--secondary-color)', width: '100%', height: '100vh' }}>
    <div className="start-page">
      <div className="logo">
        {<div className="logo">
  <img src="/LQLogo.png" alt="LitQuest Logo" />
</div>
}
      </div>
      <h1>Welcome to LitQuest</h1>
      <p>Manage your book list with ease</p>
      <p>Find your next literary adventure efficiently</p>
    </div>
    </div>
  );
};

export default StartPage;