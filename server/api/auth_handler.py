from flask import jsonify, request, abort, Blueprint
from flask_login import login_user
from email_validator import validate_email, EmailNotValidError

from models import db, User


auth_handler = Blueprint('auth_handler', __name__)


@auth_handler.route('/register', methods=['POST'])
def register():
    email = request.form.get('email', None)
    username = request.form.get('username', None)
    password = request.form.get('password', None)

    response = {
        'errors': {},
        'email': email,
        'username': username,
    }

    if not email:
        response['errors']['email'] = 'Email is not provided'
    else:
        try:
            validate_email(email)
        except EmailNotValidError:
            response['errors']['email'] = 'Email is not valid'

    if not password:
        response['errors']['password'] = 'Password is not provided'
    elif len(password) < 6:
        response['errors']['password'] = 'Password is less than 6 characters long'

    if not username:
        response['errors']['username'] = 'Username is not provided'

    if len(response['errors'].keys()) == 0:
        user = User.query.filter((User.email == email) | (User.username == username)).first()
        if user:
            if user.email == email:
                response['errors']['email'] = 'Email is not unique'
            if user.username == username:
                response['errors']['username'] = 'Username is not unique'
        else:
            user = User(username, password, email)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            response.pop('errors')
            return jsonify(response), 201

    return jsonify(response), 400


@auth_handler.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', None)
    password = request.form.get('password', None)

    response = {
        'errors': {},
        'username': username,
    }

    if username is None or len(username) == 0:
        response['errors']['username'] = 'Username is not provided'

    if password is None or len(password) == 0:
        response['errors']['password'] = 'Password is not provided'

    if len(response['errors'].keys()) == 0:
        user = User.query.filter_by(username=username).first()
        if not user:
            response['errors']['username'] = 'Username is not registered'
        else:
            if not user.verify_password(password):
                response['errors']['password'] = 'Password is not correct'
            else:
                login_user(user)
                response.pop('errors')
                return jsonify(response), 200

    return jsonify(response), 400
