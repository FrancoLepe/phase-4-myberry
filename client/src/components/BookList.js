import React from 'react'
import BookCard from './BookCard'



function BookList({books, currentUser, myBooks, checkOutBook, checkInBook }){

    // from mybooks
    // <BookList books={xx} currentUser={currentUser} myBooks={true} checkInBook={checkInBook}  checkOutBook={checkOutBook} />
    // // from home
    // <BookList books={books} currentUser={currentUser} myBooks={false} checkInBook={checkInBook} checkOutBook={checkOutBook} />


    const bookCardsArray = books.map( bookObj => {
       return <BookCard key={bookObj.id} book={bookObj} currentUser={currentUser} myBooks={myBooks} checkOutBook={checkOutBook} checkInBook={checkInBook} />  
      } )

    //   grid-rows-2 , gap-y-2

    return(
    <div>
        <section className="mb-20">
            <div className="container mx-auto">
                <div className="grid gap-4 2xl:grid-cols-6 2xl:gap-4 xl:grid-cols-5 xl:gap-4 lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-4">{bookCardsArray}</div>
            </div>
        </section>
     </div>
    )
}

export default BookList;