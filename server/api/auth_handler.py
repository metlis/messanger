from flask import request, abort, Blueprint
from flask_login import login_user
from email_validator import validate_email

from models import db, User


auth_handler = Blueprint('auth_handler', __name__)


@auth_handler.route('/register', methods=['POST'])
def register():
    try:
        email = request.form['email']
        validate_email(email)

        password = request.form['password']
        username = request.form['username']
        if len(password) < 6 or len(username) == 0:
            raise Exception('Invalid credentials')

        user = User.query.filter((User.email == email) | (User.username == username)).first()
        if not user:
            user = User(username, password, email)
            db.session.add(user)
            db.session.commit()
            return '', 201
        else:
            abort(400)
    except Exception as e:
        print(e)
        abort(400)


@auth_handler.route('/login', methods=['POST'])
def login():
    try:
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            login_user(user)
            return '', 200
        else:
            abort(401)
    except Exception as e:
        print(e)
        abort(400)
