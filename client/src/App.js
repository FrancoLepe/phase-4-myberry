import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import MyBooks from './components/MyBooks'
import Account from './components/Account'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import EditUser from './components/EditUser'
import { BrowserRouter as Router, Routes, Route, useHistory } from "react-router-dom";
import API_URL from "./apiConfig.js";
import NavBar from './components/NavBar';
import './App.css';

function App() {


  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/check_session`).then((response) => {
      if (response.ok) {
        response.json().
        then((user) =>{
          console.log(user)
          setCurrentUser(user)});
      }
    });
  }, []);





  const handleLogin = (user) => {
    setCurrentUser(user)
    console.log(user.fname)
  }

  function checkOutBook(book) {
    console.log('///////----')
    console.log(book)
    console.log('///////')
    const updatedBooks = books.map(bookObj => {
      if ((bookObj.id) === (book.book_id)) {
        bookObj.checkout_log = true;
        bookObj.checkout_id = book.id;
        bookObj.user_id = book.user_id;
        return bookObj;
      } else {
        return bookObj;
      }
    });
    setBooks(updatedBooks);
  }

  function checkInBook(book) {
    const updatedBooks = books.map(bookObj => {
      if ((bookObj.id) === (book.id)) {
        bookObj.checkout_log = false;
        bookObj.checkout_id = null;
        bookObj.user_id = null;
        return bookObj;
      } else {
        return bookObj;
      }
    });
    setBooks(updatedBooks);
  }

  useEffect( () => {
    fetch(`${API_URL}/users`)
      .then( r => r.json() )
      .then( setUsers )
  }, [] )

  useEffect( () => {
    fetch(`${API_URL}/books`)
      .then( r => r.json() )
      .then( setBooks )
  }, [] )



  const mybooks = books.filter(bookObj => bookObj.user_id ===currentUser.id)
 

  return (
    <div className="App">
      
        <NavBar currentUser={currentUser} />
        <Routes>
          <Route exact path="/mybooks" element={<MyBooks currentUser={currentUser} books={books}  xx={mybooks} checkInBook={checkInBook}  checkOutBook={checkOutBook}/> }/>
          <Route exact path="/account" element={
            <Account currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }/>
          <Route exact path="/login" element={ 
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogin={handleLogin}/>
          }/>
          <Route exact path="/createaccount" element={
            <CreateAccount />
          }/>
          <Route exact path="/edituser" element={
            <EditUser currentUser={currentUser}  setCurrentUser={setCurrentUser}  />
          }/>
          <Route exact path= "/"  element={
            <Home books={books} currentUser={currentUser} setCurrentUser={setCurrentUser} checkOutBook={checkOutBook}  checkInBook={checkInBook}  />
          }/>
        </Routes>
        
    </div>
  );
}

export default App;
