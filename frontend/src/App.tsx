import React, { useState, useEffect } from "react"
import { Novel as NovelReview } from "./models/novels"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/BookShelf';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assuming you're using Bootstrap for styling
import { Navbar, Nav, Col, Container, Row } from 'react-bootstrap';
import Novel from "./components/Novel";


function App() {

  const [novels, setNovels] = useState<NovelReview[]>([])

useEffect(() => {
    async function loadNovels() { 
        try {
            const response = await fetch ("/api/novels", {method: "GET"})
                const novels = await response.json()
                setNovels(novels)
        } catch (error) {
            console.error(error)
            alert(error)
        }
} loadNovels()
}, [])

  return (
    <Router>
        <Container>
          <Row xs={1} md={2} xl={3} className="g-4">
        {novels.map(novel => (
          <Col key={novel._id}>
          <Novel novel={novel} />
          </Col>
        ))}
        </Row>
        </Container>
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
    </Router>
  );
}

export default App;