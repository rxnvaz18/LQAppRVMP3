import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import './BookShelf.css';

function BookshelfDisplay() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch('/bookshelf/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Initialize each book with an isExpanded property
            const booksWithExpansion = data.map(book => ({
                ...book,
                isExpanded: false,
            }));
            setBooks(booksWithExpansion);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setBooks(books.map(book =>
            book._id === id ? { ...book, isExpanded: !book.isExpanded } : book
        ));
    };

    const handleReadStatusChange = async (id, readStatus, event) => {
        event.stopPropagation();  // Prevent the card expansion when clicking the checkbox
        try {
            await fetch(`/bookshelf/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ readStatus: !readStatus }),
            });
            setBooks(books.map(book => book._id === id ? { ...book, readStatus: !readStatus } : book));
        } catch (error) {
            console.error('Error updating read status:', error);
        }
    };

    const handleDelete = async (id, event) => {
        event.stopPropagation();  // Prevent the card expansion when clicking the delete button
        try {
            await fetch(`/bookshelf/delete/${id}`, { method: 'DELETE' });
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const CustomCheckbox = ({ checked, onChange }) => (
        <div onClick={onChange} style={{
            width: '20px',
            height: '20px',
            backgroundColor: checked ? '#28a745' : '#fff',
            border: '1px solid #ced4da',
            boxShadow: `0 0 5px ${checked ? 'var(--primary-color)' : 'var(--third-color)'}`,
            cursor: 'pointer',
            display: 'inline-block',
            marginRight: '8px',
            verticalAlign: 'middle',
            
        }}>
            {checked && <span style={{ color: '#fff', display: 'block', textAlign: 'center' }}>&#10003;</span>}
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
        <Container style={{ backgroundColor: 'var(--primary-color)', minHeight: '100vh', padding: '20px' }}>
            <h1 className='BookshelfTitle'>My Bookshelf</h1>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh'}}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {books.map((book) => (
                        <Col key={book._id}>
                            <Card
                                style={{ marginBottom: '1rem', backgroundColor: 'var(--secondary-color', boxShadow: book.readStatus ? '0 0 10px blue' : '0 0 10px yellow' }}
                                onClick={() => toggleExpand(book._id)}
                            >
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Img variant="top" src={book.image} />
                                    {book.isExpanded && book.description && (
                                        <Card.Text>{book.description}</Card.Text>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CustomCheckbox
                                            checked={book.readStatus}
                                            onChange={(event) => handleReadStatusChange(book._id, book.readStatus, event)}
                                            lable="Read"
                                        />
                                        <Button variant="danger" onClick={(event) => handleDelete(book._id, event)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
        </div>
    );
}

export default BookshelfDisplay;