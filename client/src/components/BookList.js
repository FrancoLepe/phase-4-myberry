import React from 'react'
import BookCard from './BookCard'

function BookList({books}){

    const bookCardsArray = books.map( bookObj => {
       return <BookCard key={bookObj.id} book={bookObj} />  
      } )


    return(
    <div>
        <p> book list data </p>
        {bookCardsArray}
     </div>
    )
}

export default BookList;