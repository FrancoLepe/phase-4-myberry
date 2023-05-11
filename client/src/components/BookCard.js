import React, { useState } from 'react'
import { NavLink } from'react-router-dom'
import API_URL from "../apiConfig.js";

function BookCard({ book, currentUser, myBooks, checkOutBook, checkInBook }) {

    let isCheckedOut = book.checkout_log
    
    const [detailToggle, setDetailToggle] = useState(false)

    function bookDetailToggle(){
        setDetailToggle(!detailToggle)
    }

    const description = book.description
    const truncatedDescription = description.substring(0, 50) + '...'

    function handleCheckOut(){
    
            const requestCheckout = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    book_id: book.id
                })
            };
            fetch(`${API_URL}/create_logs`, requestCheckout)
            .then(r=> r.json())
            .then(r=>{ 
                console.log(r)
                console.log(book)
                checkOutBook(r)
                // checkOutBook(book)
            })
    }

    function handleCheckIn(){

        let deleteId = book.checkout_id
        console.log(deleteId)
        const deleteCheckout = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
     }
       fetch(`${API_URL}/create_logs/${deleteId}`, deleteCheckout)
       .then(checkInBook(book))
    }
        
    return (
        <div className="bg-white p-4 rounded-lg rounded-tl-[70px]
        w-full max-w-[240px] mx-auto my-2 cursor-pointer hover:scale-105 duration-200">
        { detailToggle ? (null) : <img className='mx-auto max-w-[200px] h-[300px] max-h-[300px] rounded-lg rounded-tl-[50px]' src={book.image} alt={book.title} onClick={bookDetailToggle}/>}     
        <div className= "flex gap-x-1 text-m">
            { detailToggle ? (
            <div className="p-4 max-w-[240px] cursor-pointer text-sm h-[300px] max-h-[300px] text-left" onClick={bookDetailToggle}>
                <br />
                <div><b>Title:</b> {book.title}</div>
                <div><b>Author:</b> {book.author}</div>
                <div><b>Genre:</b> {book.genre}</div>
                <br />
                <div><b>Description:</b> {truncatedDescription}</div>
            </div>) : null}
        </div>

        {(myBooks) ? (
            <div className="flex items-center justify-center" key={book.id}>
                <button className="flex items-center justify-center" onClick={handleCheckIn}>Return Book</button></div>) : (<div className="flex items-center justify-center" > 
                { isCheckedOut ? (<div className="flex items-center justify-center" ><button className="flex items-center justify-center">Unavailable</button></div>) : (null)} 
                { (currentUser && !isCheckedOut) ? (<div className="flex items-center justify-center"><button className="flex items-center justify-center" onClick={handleCheckOut}>Check Me Out</button></div>) : (null)}
                { (!currentUser && !isCheckedOut) ? (<div className="flex items-center justify-center" ><button className="flex items-center justify-center"><NavLink to="/login" exact className="flex items-center justify-center">Login to Check Out</NavLink></button></div>) : (null)}
                </div>)}
        </div>
        
    )
}

export default BookCard;