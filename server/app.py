import os

from flask import Flask
from flask_login import LoginManager

from models import db
from models.user import User
from api.home_handler import home_handler
from api.auth_handler import auth_handler
from api.conversation_handler import conversation_handler
from api.user_search_handler import user_search_handler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

login_manager = LoginManager(app)
db.init_app(app)

app.register_blueprint(home_handler)
app.register_blueprint(auth_handler)
app.register_blueprint(conversation_handler)
app.register_blueprint(user_search_handler)


@login_manager.user_loader
def get_user(user_id):
    return User.query.get(user_id)
