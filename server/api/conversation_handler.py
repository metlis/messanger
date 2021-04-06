from flask import jsonify, request, Blueprint
from flask_login import login_required, current_user

from models import db
from models.user import User
from models.conversation import Conversation
from models.message import Message

conversation_handler = Blueprint('conversation_handler', __name__)


@conversation_handler.route('/conversations', methods=['GET', 'POST'])
@login_required
def conversations():
    if request.method == 'GET':
        return jsonify(current_user.get_user_conversations())
    else:
        user_id = request.json.get('user_id', '')
        id_error_message = 'Valid user ID must be provided'

        if not user_id or int(user_id) == current_user.id:
            return id_error_message, 400

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return id_error_message, 400

        conversation = Conversation.query.filter(Conversation.users.any(id=user.id),
                                                 Conversation.users.any(id=current_user.id)).first()
        if conversation:
            return 'Conversation already exists', 409

        conversation = Conversation()
        conversation.users.extend([user, current_user])
        db.session.add(conversation)
        db.session.commit()
        return '', 201


@conversation_handler.route('/conversations/<int:conversation_id>/messages',
                            methods=['GET', 'POST'])
@login_required
def messages(conversation_id):
    conversation = Conversation.query.filter((Conversation.id == conversation_id),
                                             Conversation.users.any(id=current_user.id)).first()

    if not conversation:
        return 'Conversation not found', 404

    if request.method == 'GET':
        return jsonify(conversation.get_conversation_messages())
    else:
        text = request.json.get('text', '')
        if not text:
            return 'Text is required', 400

        message = Message(conversation_id=conversation.id, author_id=current_user.id, text=text)
        db.session.add(message)
        db.session.commit()
        return '', 201
