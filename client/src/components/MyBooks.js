import React, {useState, useEffect} from 'react'
import BookList from './BookList'

function MyBooks({ books, currentUser }){
    
    const [ myCheckedOutBooks, setmyCheckedOutBooks ] = useState([])

    useEffect( () => {
        fetch(`/users/${currentUser.id}` )
          .then( r => r.json() )
          .then( r => setmyCheckedOutBooks(r.books) )
      }, [] )

      function checkInBook(book) {
        
        const updatedBooks = myCheckedOutBooks.map(bookObj => {
          if (bookObj.id === book.id) {
            bookObj.checkout_log = true;
            return bookObj;
          } else {
            return bookObj;
          }
        });
        setmyCheckedOutBooks(updatedBooks);
      }
    
    return(
    <div>
        <div>MyBooks.js</div>
        <br />
        {/* {myBooks.map( book => <div key={book.id}>{book.title}</div>)} */}
        <BookList books={myCheckedOutBooks} currentUser={currentUser} myBooks={true} checkInBook={checkInBook} />
    </div>
    )
}

export default MyBooks;