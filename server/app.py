import os

from flask import Flask, request
from flask_login import LoginManager, current_user
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
from flask_session import Session

from models import db
from models.user import User, active_users
from api.auth_handler import auth_handler
from api.users_handler import users_handler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SESSION_TYPE'] = 'filesystem'
cors = CORS(app, resources={r"/*": {
    "origins": os.environ['FRONTEND_URL'],
    "supports_credentials": True,
}})

login_manager = LoginManager(app)
db.init_app(app)

Session(app)
socketio = SocketIO(app,
                    cors_allowed_origins=os.environ['FRONTEND_URL'],
                    logger=True,
                    manage_session=False)


from api.conversation_handler import conversation_handler
app.register_blueprint(auth_handler)
app.register_blueprint(conversation_handler)
app.register_blueprint(users_handler)

if __name__ == '__main__':
    socketio.run(app)


@login_manager.user_loader
def get_user(user_id):
    return User.query.get(user_id)


@socketio.on('connect')
def connect():
    if current_user.is_authenticated:
        active_users[current_user.id] = request.sid
        for conversation in current_user.conversations:
            join_room(conversation.id)
            emit('user_logged_in', {'id': current_user.id}, to=conversation.id)


@socketio.on('disconnect')
def disconnect():
    if current_user.is_authenticated and current_user.id in active_users:
        active_users.pop(current_user.id)
        for conversation in current_user.conversations:
            leave_room(conversation.id)
            emit('user_logged_out', {'id': current_user.id}, to=conversation.id)
