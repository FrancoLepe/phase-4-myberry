import React from 'react'
import BookList from './BookList'

function Home({books}){
    return(
    <div>
        <BookList books= {books}/>
        <p> Hello Team 6</p>
    </div>
    )
}

export default Home 