import React from 'react'


function BookCard({ book, currentUser, myBooks, checkOutBook, checkInBook }) {

    let isCheckedOut = book.checkout_log
    
    function handleCheckOut(){
    
            const requestCheckout = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    book_id: book.id
                })
            };
            fetch('/create_logs', requestCheckout)
            .then(checkOutBook(book))
    }

    function handleCheckIn(){

        let deleteId = book.checkout_id
        console.log(deleteId)
        const deleteCheckout = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
     }
       fetch(`/create_logs/${deleteId}`, deleteCheckout)
       .then(checkInBook(book))
    }
        
    return (
        <div className="flex flex-col items-center bg-gray-200 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img src={book.image} alt={'Cover image for ' + book.title} className="object-cover w-full rounded-t-lg h96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" />
            <div className="flex flex-col grow  p-4 ">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Author: {book.author}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Genre: {book.genre}</p>
                { myBooks ? (
                        <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" onClick={handleCheckIn}>Check In</button>
                    ) : (
                        <div>
                            { isCheckedOut ? (
                                <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">Unavailable</button>
                            ) : <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" onClick={handleCheckOut}>Check Out</button>
                            }
                        </div>
                    )
                }
                
                
            </div>
        </div>
    )
}

export default BookCard;