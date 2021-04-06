from flask import jsonify, request, Blueprint
from flask_login import login_user, logout_user, current_user
from email_validator import validate_email, EmailNotValidError

from models import db
from models.user import User


auth_handler = Blueprint('auth_handler', __name__)


@auth_handler.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    errors = {}

    if not email:
        errors['email'] = 'Email is not provided'
    else:
        try:
            validate_email(email)
        except EmailNotValidError:
            errors['email'] = 'Email is not valid'

    if not password:
        errors['password'] = 'Password is not provided'
    elif len(password) < 6:
        errors['password'] = 'Password is less than 6 characters long'

    if not username:
        errors['username'] = 'Username is not provided'

    if len(errors.keys()) == 0:
        user = User.query.filter((User.email == email) | (User.username == username)).first()
        if user:
            if user.email == email:
                errors['email'] = 'Email is not unique'
            if user.username == username:
                errors['username'] = 'Username is not unique'
        else:
            user = User(username, password, email)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return jsonify(user.get_user_data()), 201

    return jsonify(errors), 400


@auth_handler.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email and password:
        user = User.query.filter_by(email=email).first()
        if user and user.verify_password(password):
            login_user(user)
            return jsonify(user.get_user_data()), 200

    return jsonify('Invalid credentials'), 400


@auth_handler.route('/logout', methods=['POST'])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return '', 200
    return jsonify('User is not authenticated'), 400
