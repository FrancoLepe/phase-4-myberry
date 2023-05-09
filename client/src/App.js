import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import MyBooks from './components/MyBooks'
import Account from './components/Account'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import API_URL from "./apiConfig.js";
import NavBar from './components/NavBar';
import './App.css';

function App() {

  const [books, setBooks] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  const handleLogin = (user) => {
    setCurrentUser(user)
    console.log(user.fname)
  }

  useEffect( () => {
    fetch('/books')
      .then( r => r.json() )
      .then( setBooks )
  }, [] )
  
  return (
    <div className="App">
        <NavBar currentUser={currentUser} />
        <Switch>
          <Route exact path="/mybooks">
            <MyBooks/>
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
          <Route exact path= "/">
            <Home books={books} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
