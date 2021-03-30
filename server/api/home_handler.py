from flask import jsonify, Blueprint
from flask_login import login_required

home_handler = Blueprint('home_handler', __name__)


@home_handler.route('/welcome')
@login_required
def welcome():
    return jsonify({'welcomeMessage': 'Welcome!'})
