import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import MyBooks from './components/MyBooks'
import Account from './components/Account'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import EditUser from './components/EditUser'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import API_URL from "./apiConfig.js";
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([])
  const [currentUser, setCurrentUser] = useState('')


  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(r => r.json())
      .then(setBooks)
  }, [])


  useEffect(() => {
    fetch(`${API_URL}/check_session`, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((user) => {
              setCurrentUser(user)
            });
        }
      });
  }, []);



  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  
  function handleLogout() {
    fetch(`${API_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(setCurrentUser(''))
      .then(navigate("/"))
  }


  function checkOutBook(book) {
    const updatedBooks = books.map(bookObj => {
      if ((bookObj.id) === (book.book_id)) {
        bookObj.checkout_log = true;
        bookObj.checkout_id = book.id;
        bookObj.user_id = book.user_id;
        bookObj.due_date = book.due_date;
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
        bookObj.due_date = null;
        return bookObj;
      } else {
        return bookObj;
      }
    });
    setBooks(updatedBooks);
  }


  function deleteAccount() {
    const confirmBox = window.confirm(
        `Do you really want to delete user: ${currentUser.fname} ${currentUser.lname}?`
    )
    if (confirmBox === true) {
        mybooks.map(book => checkInBook(book))
        fetch(`${API_URL}/users/${currentUser.id}`,
            { method: 'DELETE', })
            .then(() => handleLogout())
    }
}




  const mybooks = books.filter(bookObj => bookObj.user_id === currentUser.id)


  return (
    <div className="App bg-yellow-50 h-screen">

      <NavBar currentUser={currentUser} />
      <Routes>
        <Route exact path="/mybooks" element={<MyBooks currentUser={currentUser} books={books} myCheckedOut={mybooks} checkInBook={checkInBook} checkOutBook={checkOutBook} />} />
        <Route exact path="/account" element={
          <Account currentUser={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />
        } />
        <Route exact path="/login" element={
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogin={handleLogin} />
        } />
        <Route exact path="/createaccount" element={
          <CreateAccount />
        } />
        <Route exact path="/edituser" element={
          <EditUser currentUser={currentUser}  setCurrentUser={setCurrentUser}   onDeleteAccount={deleteAccount}/>
        } />
        <Route exact path="/" element={
          <Home books={books} currentUser={currentUser} setCurrentUser={setCurrentUser} checkOutBook={checkOutBook} checkInBook={checkInBook} />
        } />
      </Routes>

    </div>
  );
}

export default App;
