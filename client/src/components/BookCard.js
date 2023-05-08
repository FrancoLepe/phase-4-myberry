import React from 'react'

function BookCard({book}){
    return(
    <div>
        <div>Title:{book.title}</div>
        <div>Author: {book.author}</div>
        <div>Genre: {book.genre}</div> 
        <div><img src={book.image} alt= {book.title} height="300px" /> </div>
        <br />
    </div>
    )
}

export default BookCard;