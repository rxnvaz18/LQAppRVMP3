import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import './BookSearch.css';
import { BsSearch } from "react-icons/bs";

function BookSearch() {
    const [bookName, setBookName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state
    const [currentPage, setCurrentPage] = useState(0);
    const resultsPerPage = 12;

    const handleSearch = async (page = 0) => {
        setLoading(true); // Start loading
        const startIndex = page * resultsPerPage;
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&startIndex=${startIndex}&maxResults=${resultsPerPage}`
            );
            let books = response.data.items ? response.data.items.map((item, index) => ({
                ...item,
                isExpanded: false,
                // Use the map function's index directly for numbering, adjusted by 1 to start from 1 instead of 0
                index: index + 1,
            })) : [];

            // Sort the books array alphabetically by title
            books = books.sort((a, b) => {
                const titleA = a.volumeInfo.title.toUpperCase(); // ignore upper and lowercase
                const titleB = b.volumeInfo.title.toUpperCase(); // ignore upper and lowercase
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }

                // titles must be equal
                return 0;
            });

            setSearchResults(books);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setSearchResults([]);
        } finally {
            setLoading(false); // End loading
        }
    };
    const addToBookshelf = async (book) => {
        const bookData = {
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`,
            // Add other book details as needed
        };

        try {
            const response = await fetch('/bookshelf/add', {  // Updated endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Book added to bookshelf:', result);
            alert('Book added to bookshelf!');
        } catch (error) {
            console.error('Error adding book to bookshelf:', error);
            alert('Failed to add book to bookshelf, or already exists in the bookshelf.');
        }
    };

    const toggleExpand = (index) => {
        const updatedResults = searchResults.map((item, idx) => ({
            ...item,
            isExpanded: idx === index ? !item.isExpanded : item.isExpanded,
        }));
        setSearchResults(updatedResults);
    };

    const handleNextPage = () => {
        handleSearch(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            handleSearch(currentPage - 1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(currentPage);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh', textAlign: 'center' }}>
            <>
                <Container className='book-search-container'>

                    <h1 className='BookSearchTitle'>Book Search</h1>
                    <div className='search-input-container'>
                        <input
                            type="text"
                            placeholder="Enter a book name"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(currentPage)}
                            style={{ marginBottom: '10px', width: '20%', minWidth: '200px' }}
                        />
                        <BsSearch />
                    </div>
                    <br />
                    {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button onClick={() => handleSearch(currentPage)} style={{ width: '20%', minWidth: '200px', backgroundColor: 'var(--third-color)', color:'var(--primary-color)', border: 'none' }}>Search</Button>

                    </div> */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {searchResults.map((item, index) => (
                                <Col key={index}>
                                    <Card style={{ marginBottom: '1rem', backgroundColor: 'var()' }} onClick={() => toggleExpand(index)}>
                                        {/* <Card.Img variant="top" src={item.volumeInfo.imageLinks?.thumbnail} alt={item.volumeInfo.title} style={{ minHeight: '20%', height: '20%', maxheight: '20%', objectFit: 'contain' }} /> */}
                                        <Card.Img variant="top" src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600&source=gbs_api`} alt={item.volumeInfo.title} style={{ minHeight: '20%', height: '20%', maxHeight: '20%', objectFit: 'contain' }} />
                                        <Card.Body >
                                            <Card.Title>{`${item.volumeInfo.title}`}</Card.Title>
                                            <Card.Text>
                                                {item.volumeInfo.authors && `Author(s): ${item.volumeInfo.authors.join(', ')}`}
                                                {item.isExpanded && (
                                                    <>
                                                        <br />
                                                        <Card.Text>Description: {item.volumeInfo.description}</Card.Text>
                                                        <Card.Text>Published Date: {item.volumeInfo.publishedDate}</Card.Text>
                                                        <Card.Text>Genre: {item.volumeInfo.categories?.join(', ')}</Card.Text>
                                                        <Button variant="primary" onClick={() => addToBookshelf(item)}>Add to Bookshelf</Button>

                                                    </>
                                                )}
                                            </Card.Text>
                                            <div style={{
                                                position: 'fixed', // Keep the div fixed at the bottom of the screen
                                                bottom: '0', // Anchor the div to the bottom
                                                left: '0', // Stretch from the left edge of the viewport
                                                right: '0', // Stretch to the right edge of the viewport
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                background: 'var(--primary-color)', // Background color to ensure content doesn't show through
                                                padding: '10px 0', // Padding above and below the buttons
                                                boxShadow: '0 -2px 5px rgba(0,0,0,0.2)', // Shadow for visual separation from content
                                            }}>
                                                <Button
                                                    onClick={handlePreviousPage}
                                                    disabled={currentPage === 0}
                                                    style={{ width: '20%', minWidth: '150px', backgroundColor: 'var(--third-color)', color: 'var(--primary-color)', border: 'none' }}
                                                >
                                                    Previous
                                                </Button>
                                                <Button
                                                    onClick={handleNextPage}
                                                    disabled={searchResults.length < resultsPerPage}
                                                    style={{ width: '20%', minWidth: '150px', backgroundColor: 'var(--third-color)', color: 'var(--primary-color)', border: 'none' }}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </Row>
                    )}

                </Container>

            </>
        </div>
    );
}

export default BookSearch;