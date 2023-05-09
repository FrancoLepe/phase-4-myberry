import React from 'react'
import BookCard from './BookCard'

function BookList({books}){

    const bookCardsArray = books.map( bookObj => {
       return <BookCard key={bookObj.id} book={bookObj} />  
      } )

    //   grid-rows-2 , gap-y-2

    return(
    <div>
        <h1 className="text-4xl text-center">Booklist.js</h1>
        <div className="  m-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            
            {bookCardsArray}
            </div>
     </div>
    )
}

export default BookList;