import React, { useState, useEffect } from 'react'
import BookList from './BookList'

function MyBooks({ currentUser, books, xx, checkInBook, checkOutBook }) {

  const [myCheckedOutBooks, setmyCheckedOutBooks] = useState([])


  return (
    <div>
      <div>My Books</div>
      <br />
      <BookList books={xx} currentUser={currentUser} myBooks={true} checkInBook={checkInBook} checkOutBook={checkOutBook} />
    </div>
  )
}

export default MyBooks;