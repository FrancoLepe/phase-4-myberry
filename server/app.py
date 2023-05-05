from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Book, CheckoutLog
import random 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

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
            "created_at": user.created_at
        }
        users.append(user_dict)

    response = make_response(
        users,
        200,
        {"Content-Type": "application/json"}
    )
    return response


if __name__ == '__main__':
    app.run(port=5555)