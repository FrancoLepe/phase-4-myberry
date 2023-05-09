import React from 'react'
import NavBar from './NavBar'
import BookList from './BookList'
import './Home.css'

function Home({books, currentUser, setCurrentUser}) {
    return(
    <div>
        <BookList books= {books}/>
    </div>
    )
}

export default Home 