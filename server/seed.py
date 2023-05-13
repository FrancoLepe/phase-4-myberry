from faker import Faker
from app import app
from models import db, User, Book, CheckoutLog
import random
import json
from datetime import datetime, timedelta


faker = Faker()

with open('book-list.json') as fp:
    data = json.load(fp)

with app.app_context():

    User.query.delete()
    CheckoutLog.query.delete()
    Book.query.delete()

############ * User * #############

    for i in range(10):
        user = User(
            fname = faker.first_name(),
            lname= faker.last_name(),
            email = faker.email(),
            phone = random.randint(1000000000, 9999999999),
            role = 'user',
            password='password'
        )

        db.session.add(user)
        db.session.commit()


############ * Books * #############
    # genres = ["horror", "personal development", "non-fiction"]

    for book in data['books']:
        book_info = Book(
            title = book['title'],
            author= book['author'],
            description =  book['description'],
            image =  book['image'],
            year= book['year'],
            genre= book['genre']
        )

        db.session.add(book_info)
        db.session.commit()


############ * CheckoutLog * #############

    book_pick = [book.id for book in Book.query.all()]
    while len(book_pick) > 10:
        rand_user = random.choice(User.query.all())
        rand_book=random.choice(book_pick)
        due_date = datetime.now() + timedelta(days=14)
        checkout_log_data = CheckoutLog(
            book_id= rand_book,
            user_id= rand_user.id,
            due_date= due_date
        )
        
        book_pick.remove(rand_book)
        db.session.add(checkout_log_data)
        db.session.commit()







