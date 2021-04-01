import os

from flask import Flask
from flask_cors import CORS

from models import db, login_manager
from api.home_handler import home_handler
from api.auth_handler import auth_handler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
cors = CORS(app, resources={r"/*": {
    "origins": os.environ['FRONTEND_URL'],
    "supports_credentials": True,
}})

login_manager.init_app(app)
db.init_app(app)

app.register_blueprint(home_handler)
app.register_blueprint(auth_handler)
