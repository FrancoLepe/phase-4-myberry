import React from 'react'
import { useState, useEffect } from'react';

function Home() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/books')
            .then((r) => r.json())
            .then(setBooks);
        }, []);
    
    const bookObjArray = books.map( bookObj => {
        return <div>{bookObj.title}</div>
        } )
  
    return (
    <div>
        <div>Homepage</div>
        <br/>
        <div>{bookObjArray}</div>
    </div>

  );
 

}


export default Home;