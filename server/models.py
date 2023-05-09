from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import date, datetime, timedelta

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__= 'users'
    
    serialize_rules = ("-created_at", "-updated_at", "-checkout_logs")

    id=db.Column(db.Integer, primary_key=True)
    fname=db.Column(db.String, nullable= False)
    lname=db.Column(db.String, nullable= False)
    role=db.Column(db.String, nullable= False)
    phone=db.Column(db.Integer, nullable= False)
    email=db.Column(db.String, nullable= False, unique =True)
    password=db.Column(db.String, nullable= False)
    created_at=db.Column(db.DateTime, server_default=db.func.now())
    updated_at=db.Column(db.DateTime, onupdate=db.func.now())

    checkout_logs=db.relationship("CheckoutLog", backref= 'user', cascade= 'all, delete, delete-orphan')
    books=association_proxy('checkout_logs','book')
    
    @validates('email')
    def validate_email(self, key,value):
        if not value:
            raise ValueError('email is required')
        return value
    @validates('password')
    def validate_password(self, key,value):
        if not value:
            raise ValueError('password is required')
        return value

class Book(db.Model, SerializerMixin):
    __tablename__='books'

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String)
    author=db.Column(db.String)
    genre= db.Column(db.String)
    year=db.Column(db.Integer)
    image=db.Column(db.String)
    description=db.Column(db.String)

    checkout_logs=db.relationship("CheckoutLog", backref= 'book', cascade= 'all, delete, delete-orphan')
    books=association_proxy('checkout_logs','user')

class CheckoutLog(db.Model, SerializerMixin):
    __tablename__='checkout_logs'

    id=db.Column(db.Integer, primary_key=True)
    book_id=db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    checkout_date=db.Column(db.DateTime, server_default=db.func.now())
    due_date=db.Column(db.DateTime)
    # server_default=datetime.date.today() + datetime.timedelta(days=14))



