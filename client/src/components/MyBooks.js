import React, {useState, useEffect} from 'react'
import BookList from './BookList'

function MyBooks({ currentUser, checkInBook }){
    
    const [ myCheckedOutBooks, setmyCheckedOutBooks ] = useState([])

    useEffect( () => {
        fetch(`/users/${currentUser.id}` )
          .then( r => r.json() )
          .then( r => setmyCheckedOutBooks(r.books) )
      }, [] )
    
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