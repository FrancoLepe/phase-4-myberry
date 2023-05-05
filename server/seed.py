from random import choice as rc, randint
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import db, User, Book, CheckoutLog
import random


faker = Faker()

with app.app_context():
# if __name__ == '__main__':

    User.query.delete()
    CheckoutLog.query.delete()
    Book.query.delete()

############ * User * #############

    for i in range(10):
        user = User(
            fname = faker.first_name(),
            lname= faker.last_name(),
            email = faker.email(),
            phone = 32,
            role = 'user',
            password='password'
        )

        db.session.add(user)
        db.session.commit()


    
############ * Books * #############
    genres = ["horror", "personal development", "non-fiction"]

    for i in range(10):
    
        book_info = Book(
            title = faker.sentence(nb_words=5, variable_nb_words=False),
            author=faker.name(),
            description = faker.sentence(nb_words=15, variable_nb_words=False),
            image = 'https://timvandevall.com/wp-content/uploads/Book-Cover-Template-Thumb.jpg',
            year=2023,
            genre=random.choice(genres)
        )

        db.session.add(book_info)
        db.session.commit()
        

    
############ * CheckoutLog * #############

   

    for i in range(10):
        
        checkout_log_data = CheckoutLog(
            book_id= 1,
            user_id= 1
        )
        db.session.add(checkout_log_data)
        db.session.commit()



   
       








