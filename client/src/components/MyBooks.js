import React from 'react'
import BookList from './BookList'

function MyBooks({ currentUser, myCheckedOut, checkInBook, checkOutBook }) {



  return (
      <div className="container mx-auto bg-amber-200 rounded-xl border p-8 drop-shadow-3xl font-bold text-2xl">
        <h1>My Books</h1>
        <BookList books={myCheckedOut} currentUser={currentUser} myBooks={true} checkInBook={checkInBook} checkOutBook={checkOutBook} />
    </div>
  )
}

export default MyBooks;