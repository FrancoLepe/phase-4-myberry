import React from 'react'
import BookCard from './BookCard'



function BookList({books, currentUser, myBooks, checkOutBook, checkInBook }){

    // from mybooks
    // <BookList books={xx} currentUser={currentUser} myBooks={true} checkInBook={checkInBook}  checkOutBook={checkOutBook} />
    // // from home
    // <BookList books={books} currentUser={currentUser} myBooks={false} checkInBook={checkInBook} checkOutBook={checkOutBook} />


    console.log('------------')
    console.log(books)
    console.log('------------')
    const bookCardsArray = books.map( bookObj => {
       return <BookCard key={bookObj.id} book={bookObj} currentUser={currentUser} myBooks={myBooks} checkOutBook={checkOutBook} checkInBook={checkInBook} />  
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