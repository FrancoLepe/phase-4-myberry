from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Book, CheckoutLog
import random 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b"\x7f\x7f(\xe8\x0c('\xa8\xa5\x82pb\t\x1d>rZ\x8c^\x7f\xbb\xe2L|"

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

@app.route('/')
def index():
    return '<h1>myBerry API is running!</h1>'


@app.route('/users', methods=['GET'])
def get_users():
    users = []
    for user in User.query.all():
        user_dict = {
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "created_at": user.created_at
        }
        users.append(user_dict)

    response = make_response(
        users,
        200,
        {"Content-Type": "application/json"}
    )
    return response

@app.route('/users', methods=['POST'])
def create_user():
    user = User(
        fname=request.json.get("fname"),
        lname=request.json.get("lname"),
        email=request.json.get("email"),
        phone=request.json.get("phone"),
        role="user",
        password=request.json.get("password"),
    )
    db.session.add(user)
    db.session.commit()
    user_dict = {
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "password": user.password,
    }
    response = make_response(
        user_dict,
        201,
        {"Content-Type": "application/json"}
    )
    return response


class Users(Resource):

    def get(self,id):
        user = User.query.filter_by(id=id).first()
        user_dict = user.to_dict(rules = ('books',))
        response = make_response(
            user_dict,
            200,
            {"Content-Type": "application/json"}
        )
        return response
api.add_resource(Users, '/users/<int:id>')


@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    user.fname = request.json.get("fname")
    user.lname = request.json.get("lname")
    user.email = request.json.get("email")
    user.phone = request.json.get("phone")
    db.session.commit()
    user_dict = {
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
        "phone": user.phone
    }
    response = make_response(
        user_dict,
        200,
        {"Content-Type": "application/json"}
    )
    return response

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    user_dict = {
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
        "phone": user.phone
    }
    response = make_response(
        user_dict,
        200,
        {"Content-Type": "application/json"}
    )
    return response


class Login(Resource):
    def post(self):
        data = request.get_json()
        email= data['email']
        password= data['password']
        user = User.query.filter_by(email=email).first()
        if  user:
            if (user.password == password):
                session['user_id'] = user.id
                return make_response(user.to_dict(),200)
        return make_response({'error':'401 Unauthorized'},401)
        
api.add_resource(Login, '/login')

# @app.route('/books', methods=['GET'])
# def get_books():
#     books = []
#     for book in Book.query.all():
#         book_dict = {
#             "id": book.id,
#             "title": book.title,
#             "genre": book.genre,
#             "description": book.description,
#             "author": book.author,
#             "year": book.year,
#             "image": book.image
#         }
#         books.append(book_dict)

#     response = make_response(
#         books,
#         200,
#         {"Content-Type": "application/json"}
#     )
#     return response
class Books(Resource):

    def get(self):
        books = Book.query.all()
        books_dict = [book.to_dict(rules = ('checkout_logs.id',)) for book in books]
        
        response = make_response(
            books_dict,
            200,
            {"Content-Type": "application/json"}
        )
        return response
api.add_resource(Books, '/books')

class CreateLogs(Resource):
     def post(self):
        data = request.get_json()
        try:
            new_log= CheckoutLog(
                user_id=data['user_id'],
                book_id=data['book_id']
            )
            db.session.add(new_log)
            db.session.commit()

        except Exception as errors:
            return make_response({
                "errors":[errors.__str__()]
            },422)

        new_log_dict = new_log.to_dict()
        return make_response(new_log_dict, 201)

api.add_resource(CreateLogs, '/create_logs')

class CreateLogsById(Resource):
    def delete(self,id):
        log = CheckoutLog.query.filter_by(id=id).first()
        if not log:
            return make_response({
                'error': 'books not found'}, 404
                )
        db.session.delete(log)
        db.session.commit()

        return make_response('', 200)

api.add_resource(CreateLogsById, '/create_logs/<int:id>')



if __name__ == '__main__':
    app.run(port=5555)