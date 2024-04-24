import React, { useState, } from 'react';
import axios from 'axios';

function BookSearch() {
    const [bookName, setBookName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const resultsPerPage = 10;

    const handleSearch = async (page = 0) => {
        const startIndex = page * resultsPerPage; // Calculate the start index for the current page
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&maxResults=10`
            );

            const books = response.data.items.map((item) => ({
                ...item,
                isExpanded: false, // Add an isExpanded flag to each book
            }));

            setSearchResults(books);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching data from the Google Books API:', error.message);
            setSearchResults([]);
        }
       
    };

    const toggleExpand = (index) => {
        const updatedResults = searchResults.map((item, idx) => {
            if (idx === index) {
                return { ...item, isExpanded: !item.isExpanded };
            }
            return item;
        });
        setSearchResults(updatedResults);
    };

     // Function to go to the next page
     const handleNextPage = () => {
        handleSearch(currentPage + 1);
    };

    // Function to go to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            handleSearch(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>Book Search</h1>
            <input
                type="text"
                placeholder="Enter a book name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={searchResults.length < resultsPerPage}>
                Next
            </button>
            <div>
                {searchResults.length > 0 ? (
                    <div>
                        <h2>Search Results:</h2>
                        <ul style={{ listStyle: 'numbers' }}>
                            {searchResults.map((item, index) => (
                                <li key={index} onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                                    <img
                                        src={item.volumeInfo.imageLinks?.thumbnail}
                                        alt={item.volumeInfo.title}
                                        style={{ width: '100px', height: '150px' }}
                                    />
                                    <br />
                                    <strong>Title:</strong> {item.volumeInfo.title}
                                    <br />
                                    {item.volumeInfo.authors && (
                                        <span>
                                            <strong>Author(s):</strong> {item.volumeInfo.authors.join(', ')}
                                        </span>
                                    )}
                                    {item.isExpanded && (
                                        <div>
                                            <br />
                                            <strong>Description:</strong> {item.volumeInfo.description}
                                            <br />
                                            <strong>Published Date:</strong> {item.volumeInfo.publishedDate}
                                            <br />
                                            <strong>Genre:</strong> {item.volumeInfo.categories?.join(', ')}
                                        </div>
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No books found for the given search query.</p>
                )}
            </div>
        </div>
    );
}

export default BookSearch;