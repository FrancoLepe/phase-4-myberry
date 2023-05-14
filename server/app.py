from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Book, CheckoutLog
from datetime import datetime, timedelta
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with your own secret key
jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}}, allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "PUT", "DELETE", "PATCH"])



migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)


@app.route('/')
def index():
    return '<h1>myBerry API is running!</h1>'



class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(
            users,
            200,
            {"Content-Type": "application/json"}
        )
        return response

    def post(self):
        data = request.get_json()
        try:
            user = User(
                fname=data["fname"],
                lname=data["lname"],
                email=data["email"],
                phone=data["phone"],
                role="user",
                password=data["password"],
            )
            db.session.add(user)
            db.session.commit()
        except Exception as errors:
            return make_response({
                "errors": [errors.__str__()]
            }, 422)
        return make_response(user.to_dict(), 201)
api.add_resource(Users, '/users')


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        user_dict = user.to_dict(rules=('books', 'books.checkout_logs.id',))
        response = make_response(
            user_dict,
            200,
            {"Content-Type": "application/json"}
        )
        return response

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'user not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        response = make_response('', 200)
        return response
    
    
    def patch(self,id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'user not found'}, 404)
        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(user.to_dict(),202)

    
api.add_resource(UserById, '/users/<int:id>')



class Books(Resource):
    def get(self):
        books = []
        for book in Book.query.all():
            log = CheckoutLog.query.filter_by(book_id=book.id).first()
            if log:
                x = True
                checkout_id = log.id
                user = log.user_id
                due_date= log.due_date
            else:
                x = False
                checkout_id = None
                user = None
                due_date= None
                

            book_dict = {
                "id": book.id,
                "title": book.title,
                "author": book.author,
                "genre": book.genre,
                "year": book.year,
                "image": book.image,
                "description": book.description,
                "checkout_log": x,
                "checkout_id": checkout_id,
                "user_id": user,
                "due_date": due_date
            }
            books.append(book_dict)

        response = make_response(
            books,
            200,
            {"Content-Type": "application/json"}
        )
        return response
api.add_resource(Books, '/books')


class CreateLogs(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_log = CheckoutLog(
                user_id=data['user_id'],
                book_id=data['book_id'],
                due_date= datetime.utcnow() + timedelta(days=14)
            )
            db.session.add(new_log)
            db.session.commit()
        except Exception as errors:
            return make_response({
                "errors": [errors.__str__()]
            }, 422)        
        new_log_dict = {
            "user_id": new_log.user_id,
            "due_date": new_log.due_date,
            "book_id": new_log.book_id,
            "id": new_log.id
        }
        
        return make_response(new_log_dict, 201)
api.add_resource(CreateLogs, '/create_logs')


class CreateLogsById(Resource):
    
    
    def delete(self, id):
        log = CheckoutLog.query.filter_by(id=id).first()
        if not log:
            return make_response({'error': 'books not found'}, 404)
        db.session.delete(log)
        db.session.commit()
        return make_response('', 200)
api.add_resource(CreateLogsById, '/create_logs/<int:id>')




@app.route('/login', methods=['OPTIONS', 'POST'])
def login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response

    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                access_token = create_access_token(identity=user.id)
                return jsonify({'access_token': access_token, 'user': user.to_dict()}), 200
        return jsonify({'error': '401 Unauthorized'}), 401




class Logout(Resource):
    def delete(self):
        session['user_id'] = None

        
        return {'message': '204: No Content'}, 204
api.add_resource(Logout, '/logout')


class CheckSession(Resource):
    @jwt_required()  # Protect the endpoint with JWT authentication
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401



api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(port=5555)
