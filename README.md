# Description

Develop a RESTful API using Node.js for managing books.

## Installation

Make sure that node, npm and mongoDB is installed, then follow the following steps:

- npm install
- node src/index

## Get Started

Once service is up, we can explore the [APIs](https://api.postman.com/collections/13813466-efef62fe-bb10-4b4f-a8a7-25d63205b354?access_key=PMAT-01HETGYYRVFN32BH56VTRHM34N) exposed :
 
1. Add a new book (title, author, summary) - http://localhost:5080/books  : To add the book details (Method : POST)
2. View a list of all books - http://localhost:5080/books :  To Retrieve all the book details (Method : GET)
3. View details of a specific book by its ID - http://localhost:5080/books/{id}  : To get a book details by Id (Method : GET)
4. Update a book's details - http://localhost:5080/books/{id} : To update a book details by Id (Method : PUT)
5. Delete a book - http://localhost:5080/books/{id} : To delete a book details by Id (Method : DELETE)
