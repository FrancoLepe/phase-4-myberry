# Phase 4 MyBerry Digital Library Project  - Diana, Franco, Scott

## This site is deployed at: https://flatiron-myberry-client.onrender.com/



## How to run locally:
### Start the backend server:
- In the terminal:
  - Navigate to the 'server' subdirectory (path should be phase-4-myberry/server)
  - Run: "pipenv install" to install dependencies
  - Run: "pipenv shell" to enter the shell
  - Run: "python app.py" to start the backend server
### Start the frontend site:
- Open a new terminal:
  - Navigate to the 'client' subdirectory (path should be phase-4-myberry/client)
  - Run: "npm install" to install dependencies
  - Run: "npm start" to start the backend server



## Description
- This is a digital library user interface tool

## Functionality

- Navigation 
  - If no user logged in: 
      - Show 'Login' button
  - If user logged in:
      - Show 'My Books' 
      - Show 'My account'
      - Show user first and last name


- Landing page:
  - If no user logged in: 
    - see all books that exist in the library:
      - books that are already checked out are greyed out as "unavailable'
      - books that are available to check-out indicate "log-in to check out"
  - If user logged in:
    - see all books that exist in the library:
      - books that are already checked out are greyed out as "unavailable'
      - user can check-out books


- Login: 
  - SigIn with existing credentials
  - create new account

- Create new account:
  - all fields are required
  - email must be unique
  - redirects to Landing page

- My Books:
  - Shows user's checked out books
  - User can check-in books

- My Account:
  - Print user details
  - User can update user details
  - user can log out

- Edit User Account:
  - User can edit user details
  - Delete account 
    - all user's books are automatically checked-in upon user delete
    - logs user out
    - deletes account from database
    - redirects to homepage
  

 