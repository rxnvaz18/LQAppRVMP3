import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/BookShelf';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assuming you're using Bootstrap for styling
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="var(--primary-color)" expand="lg" variant="dark">
          <Navbar.Brand as={Link} to="/">LitQuest</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" style={{ color: 'var(--secondary-color)' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/search" style={{ color: 'var(--secondary-color)' }}>Book Search</Nav.Link>
              <Nav.Link as={Link} to="/bookshelf" style={{ color: 'var(--secondary-color)' }}>My Bookshelf</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;