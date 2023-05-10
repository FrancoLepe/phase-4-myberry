import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import MyBooks from './components/MyBooks'
import Account from './components/Account'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import EditUser from './components/EditUser'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import API_URL from "./apiConfig.js";
import NavBar from './components/NavBar';
// import logo from './images/myBerry-transparent-background-3.png'
import './App.css';

function App() {

  const history = useHistory();

  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [currentUser, setCurrentUser] = useState('')

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
    fetch('/users')
      .then( r => r.json() )
      .then( setUsers )
  }, [] )

  useEffect( () => {
    fetch('/books')
      .then( r => r.json() )
      .then( setBooks )
  }, [] )



  const mybooks = books.filter(bookObj => bookObj.user_id ===currentUser.id)
 

  return (
    <div className="App">
        <NavBar currentUser={currentUser} />
        {/* <img src={logo} alt="logo" width={200} height={100}/> */}
        <Switch>
          <Route exact path="/mybooks">
            <MyBooks currentUser={currentUser} books={books}  xx={mybooks} checkInBook={checkInBook}  checkOutBook={checkOutBook}/>
          </Route>
          <Route exact path="/account">
            <Account currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/login">
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogin={handleLogin}/>
          </Route>
          <Route exact path="/createaccount">
            <CreateAccount />
          </Route>
          <Route exact path="/edituser">
            <EditUser currentUser={currentUser} />
          </Route>
          <Route exact path= "/">
            <Home books={books} currentUser={currentUser} setCurrentUser={setCurrentUser} checkOutBook={checkOutBook}  checkInBook={checkInBook}  />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
