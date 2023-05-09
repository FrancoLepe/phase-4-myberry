import React, {useState, useEffect} from 'react'
import BookList from './BookList'

function MyBooks({ currentUser }){
    
    const [ myBooks, setMyBooks ] = useState([])

    useEffect( () => {
        fetch(`/users/${currentUser.id}` )
          .then( r => r.json() )
          .then( r => setMyBooks(r.books) )
      }, [] )
    
    return(
    <div>
        <div>MyBooks.js</div>
        <br />
        {/* {myBooks.map( book => <div key={book.id}>{book.title}</div>)} */}
        <BookList books= {myBooks}/>
    </div>
    )
}

export default MyBooks;