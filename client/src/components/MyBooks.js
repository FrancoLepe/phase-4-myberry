import React, {useState, useEffect} from 'react'
import BookList from './BookList'

function MyBooks({ currentUser, books, xx, checkInBook, checkOutBook  }){
 
    const [ myCheckedOutBooks, setmyCheckedOutBooks ] = useState([])

    // useEffect( () => {
    //     fetch(`/users/${currentUser.id}` )
    //       .then( r => r.json() )
    //       .then( r => setmyCheckedOutBooks(r.books) )
    //   }, [] )
      // function checkInBook(book) {
        
      //   const updatedBooks = myCheckedOutBooks.map(bookObj => {
      //     if (bookObj.id === book.id) {
      //       bookObj.checkout_log = true;
      //       return bookObj;
      //     } else {
      //       return bookObj;
      //     }
      //   });
      //   setmyCheckedOutBooks(updatedBooks);
      // }
    
    return(
    <div>
        <div>My Books</div>
        <br />
        {/* {myBooks.map( book => <div key={book.id}>{book.title}</div>)} */}
        <BookList books={xx} currentUser={currentUser} myBooks={true} checkInBook={checkInBook}  checkOutBook={checkOutBook} />
    </div>
    )
}

export default MyBooks;