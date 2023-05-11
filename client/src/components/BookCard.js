import React, { useState } from 'react'
import API_URL from "../apiConfig.js";
import { Route, useNavigate } from "react-router-dom";
import { DateTime } from 'luxon'


function BookCard({ book, currentUser, myBooks, checkOutBook, checkInBook }) {
    const navigate = useNavigate();

    let isCheckedOut = book.checkout_log

    const [detailToggle, setDetailToggle] = useState(false)

    function bookDetailToggle() {
        setDetailToggle(!detailToggle)
    }

    const description = book.description
    const truncatedDescription = description.substring(0, 50) + '...'

    function handleCheckOut() {
        const requestCheckout = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                book_id: book.id,
                due_date: DateTime.now().plus({ days: 14 }).toUnixInteger()
            })
        };
        fetch(`${API_URL}/create_logs`, requestCheckout)
            .then(r => r.json())
            .then(r => {
                checkOutBook(r)
            })
    }

    function handleCheckIn() {

        let deleteId = book.checkout_id
        const deleteCheckout = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`${API_URL}/create_logs/${deleteId}`, deleteCheckout)
            .then(checkInBook(book))
    }


    const renderButton = () => {
        if (myBooks) {
            return <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" onClick={handleCheckIn}>Check In</button>
        } else {
            if (isCheckedOut) {
                return <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">Unavailable</button>
            } else {
                if (currentUser) {
                    return <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" onClick={handleCheckOut}>Check Out</button>
                } else {
                    return <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" onClick={() => navigate("/login")}>Check Out</button>
                }
            }
        }
    }

    return (

        <div className="bg-white p-4 rounded-lg rounded-tl-[70px]
        w-full max-w-[240px] mx-auto my-2 cursor-pointer hover:scale-105 duration-200">
            {detailToggle ? (null) : <img className='mx-auto max-w-[200px] h-[300px] max-h-[300px] rounded-lg rounded-tl-[50px]' src={book.image} alt={book.title} onClick={bookDetailToggle} />}
            <div className="flex gap-x-1 text-m">
                {detailToggle ? (
                    <div className="p-4 max-w-[240px] cursor-pointer text-sm h-[300px] max-h-[300px] text-left" onClick={bookDetailToggle}>
                        <br />
                        <div><b>Title:</b> {book.title}</div>
                        <div><b>Author:</b> {book.author}</div>
                        <div><b>Genre:</b> {book.genre}</div>
                        <br />
                        <div><b>Description:</b> {truncatedDescription}</div>
                    </div>) : null}
            </div>
            <div>{renderButton()}</div>
        </div>
    )
}

export default BookCard;