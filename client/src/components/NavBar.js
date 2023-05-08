import React from 'react';
import { NavLink } from "react-router-dom";


function NavBar(){
    return(
    <div>
        <ul>
          <NavLink exact to="/" ><li>Home</li></NavLink>
          <NavLink exact to="/mybooks" ><li>My Books</li></NavLink>
          <NavLink exact to="/account" ><li>My Account</li></NavLink>
        </ul>
      </div>
      
    )
}

export default NavBar;
