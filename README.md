# LQAppRVMP3
A new and improved book reading list to track your literature consumption. Like a virtual bookshelf it has been updated with a login feature and a book review section.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API_Endpoints](#API_Endpoints)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

## Installation
1. Clone the repository
2. Install dependencies using `npm install`
3. Configure environmental variables in `.env` file
4. Start server using `npm start`

## Usage

1. Open the application in your web browser.
2. Sign up for an account or log in if you already have one.
3. Search for a book of your choice within the search bar on the landing page.
4. Add the book of your choice to your bookshelf.
5. Embark on your reading journey and check books you have read to update your reading list. 
6. After reading a book, add a review or notes in your book reviews section.

## API Endpoints
This document outlines the API endpoints provided by the server for managing books in a bookshelf.

### Retrieve Users 
- **HTTP Method:** GET 
- **Path:** `/api/users`
- **Description:** Retrieves a list of all users.

### Search Books
- **HTTP Method:** GET 
- **Path:** `/api/search`
- **Description:** Search for books via the Google Books API.
Query Params: query (string) - The search query term or phrase.
Response: A JSON array of books, each with a title and description.
Example: GET /api/search?query=Harry+Potter

### Bookshelf
- **HTTP Method:** POST 
- **Path:** `/bookshelf/add`
- **Description:**Add a new book to the bookshelf.
Body: A JSON object containing the book details (title, description, etc.).
Response: A JSON object of the added book.
Example:
POST /bookshelf/add
```json
{
  "title": "The Hobbit",
  "description": "A fantasy novel by J.R.R. Tolkien."
}
```

#### Update Read Status
- **HTTP Method:** PUT
- **Path:** `/bookshelf/update/:id`
- **Description:** Update the read status of a book in the bookshelf.
Params: id (string) - The ID of the book to update.
Body: A JSON object containing the new read status (readStatus).
Response: A JSON object of the updated book.
Example:
PUT /bookshelf/update/123456789
```json
{
  "readStatus": true
}
```

#### Get All Books
- **HTTP Method:** GET
- **Path:** `/bookshelf/all`
- **Description:**Retrieve all books from the bookshelf.
Response: A JSON array of all books in the bookshelf.
Example: GET /bookshelf/all

#### Delete a Book
- **HTTP Method:** DELETE
- **Path:** `/bookshelf/delete/:id`
- **Description:** Remove a book from the bookshelf.
Params: id (string) - The ID of the book to delete.
Response: A JSON object of the deleted book.
Example: DELETE /bookshelf/delete/123456789

### Book Reviews
- **HTTP Method:** GET
- **Path:** `/api/novels`
- **Description:** Retrieves a list of all novels with their reviews.
 -Request Parameters:None
-Response: Status Code: 200 OK
-Response Body Example:
```json
[
  {
    "id": "1",
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "reviews": [
      {
        "id": "1",
        "rating": 5,
        "comment": "Excellent book!"
      },
      {
        "id": "2",
        "rating": 4,
        "comment": "Enjoyable read."
      }
    ]
  },
  {
    "id": "2",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "reviews": [
      {
        "id": "3",
        "rating": 5,
        "comment": "A classic!"
      }
    ]
  }
]
```

#### Retrieve a Specific Review
-**HTTP Method:** GET
-**Path:** `/api/novels/:novelId`
-**Description:** Retrieves details of a specific novel identified by novelId.
-Request Parameters:
    novelId (path parameter): ID of the novel to retrieve.
-Response: Status Code: 200 OK
-Response Body Example:

```json
{
  "id": "1",
  "title": "Harry Potter and the Sorcerer's Stone",
  "author": "J.K. Rowling",
  "reviews": [
    {
      "id": "1",
      "rating": 5,
      "comment": "Excellent book!"
    },
    {
      "id": "2",
      "rating": 4,
      "comment": "Enjoyable read."
    }
  ]
  ```
#### Create a New Novel Review
-**HTTP Method:** POST
-**Path:** /api/novels
-**Description:** Creates a new novel review.
-Request Body Example: 
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "reviews": [
    {
      "rating": 4,
      "comment": "Classic novel!"
    }
  ]
}
```
-Response Example: Status Code: 201 Created
Response Body Example:
```json
{
  "id": "3",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "reviews": [
    {
      "id": "4",
      "rating": 4,
      "comment": "Classic novel!"
    }
  ]
}
```

#### Update an Existing Novel Review
-**HTTP Method:** PATCH
-**Path:** /api/novels/:novelId
-**Description:** Updates an existing novel review identified by novelId
-Request Parameters: `novelId (path parameter): ID of the novel to update.
-Request Body Example:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "reviews": [
    {
      "id": "4",
      "rating": 5,
      "comment": "A timeless classic!"
    }
  ]
}
```
-Response: Status Code: 200 OK
-Response Body Example:
```json
{
  "id": "3",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "reviews": [
    {
      "id": "4",
      "rating": 5,
      "comment": "A timeless classic!"
    }
  ]
}
```
#### Delete a Novel Review
-**HTTP Method:** DELETE
-**Path:** /api/novels/:novelId
-**Description:** Deletes a novel review identified by novelId.
-Request Parameters: `novelId` (path parameter): ID of the novel to delete.
-Response: Status Code: 200 OK
-Response Body Example: 
```json
{
  "message": "Novel review deleted successfully"
}
```

## Author
This LitQuest App version 2.0 has been created by Roxana Vazquez
### Future Plans
This author hopes to use their newfound skills to become a frontend developer within the neuroscience community and that these skills will aid in their future research pursuits.

## Acknowledgements
LitQuest version 2.0 is a project submitted by Roxana for their final SDSU Coding bootcamp milestone project. With the help of all of Thrive DX's instructors and the course content, Roxana was able to develop a stylish and functional book reading app with inspiration taken from Good Reads. 
