from flask import jsonify, request, Blueprint
from flask_login import login_required
from sqlalchemy import func

from models.user import User

user_search_handler = Blueprint('user_search_handler', __name__)


@user_search_handler.route('/search_users', methods=['GET'])
@login_required
def search_users():
    query = request.args.get('query', '').lower()
    if not query:
        return 'Query string is required', 400

    users = User.query.filter(func.lower(User.username).contains(query)).all()
    users = [user.get_user_data() for user in users]
    return jsonify(users), 200
