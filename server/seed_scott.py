#!/usr/bin/env python3
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime
from datetime import date
from app import app
from models import db, User, Book, CheckoutLog

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Delete existing records
        User.query.delete()
        Book.query.delete()
        CheckoutLog.query.delete()

        scott_henry = User(
            fname="Scott",
            lname="Henry",
            email="scotthenry1@gmail.com",
            phone="5132279750",
            role="admin",
            password="password"
        )

        diana_jordan = User(
            fname="Diana",
            lname="Jordan",
            email="dj@diana.com",
            phone="1112223333",
            role="admin",
            password="password"
        )

        franco_lepe = User(
            fname="Franco",
            lname="Lepe",
            email="franco@lepe.com",
            phone="3213214321",
            role="admin",
            password="password"
        )

        book1 = Book(
            title="The Hidden Life of Trees",
            author="Peter Wohlleben",
            genre="Science",
            year="2015",
            image="https://m.media-amazon.com/images/I/513MzQDmx1L._SY344_BO1,204,203,200_.jpg",
        )

        book2 = Book(
            title="Cosmos",
            author="Carl Sagan",
            genre="Science",
            year="1980",
            image="https://m.media-amazon.com/images/I/51IcVjsJlDL._SY344_BO1,204,203,200_.jpg",
        )

        book3 = Book(
            title="A Walk in the Woods: Rediscovering America on the Appalachian Trail",
            author="Bill Bryson",
            genre="Science",
            year="1998",
            image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388189974i/9791.jpg",
        )

        checkoutlog1 = CheckoutLog(
            user_id=1,
            book_id=1,
        )

        checkoutlog2 = CheckoutLog(
            user_id=2,
            book_id=2,
        )

        checkoutlog3 = CheckoutLog(
            user_id=3,
            book_id=3,
        )

        session.bulk_save_objects([scott_henry, diana_jordan, franco_lepe, book1, book2, book3, checkoutlog1, checkoutlog2, checkoutlog3])
        session.commit()
        print("Seeding done!")