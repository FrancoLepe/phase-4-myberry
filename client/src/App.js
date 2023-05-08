import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import MyBooks from './components/MyBooks'
import Account from './components/Account'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';



function App() {

  const [books, setBooks] = useState([])

  useEffect( () => {
    fetch( 'http://127.0.0.1:5555/books' )
      .then( r => r.json() )
      .then( setBooks )
  }, [] )
  console.log(books)
  

  return (
    <div className="App">
      

      <Router>
      <NavBar />
       <Switch>
         <Route path="/mybooks">
           <MyBooks/>
         </Route>
         <Route path="/account" >
           <Account />
         </Route>
         <Route path= "/">
           <Home books={books}/>
         </Route>
       </Switch>

      </Router>
    </div>
  );
}

export default App;
