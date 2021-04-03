import os

from flask import Flask

from models import db, login_manager
from api.home_handler import home_handler
from api.auth_handler import auth_handler
from api.conversation_handler import conversation_handler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

login_manager.init_app(app)
db.init_app(app)

app.register_blueprint(home_handler)
app.register_blueprint(auth_handler)
app.register_blueprint(conversation_handler)
