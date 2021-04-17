from . import db
from .message import Message


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    messages = db.relationship("Message", backref="conversation", lazy='dynamic')

    def __repr__(self):
        return '<Conversation {}>'.format(self.id)

    def get_conversation_data(self, user_id):
        last_message = self.messages.order_by(Message.id.desc()).first()
        if last_message:
            last_message = last_message.get_message_data()
        return {
            'id': self.id,
            'last_message': last_message,
            'users': [user.get_user_data() for user in self.users],
            'unread_messages': self.messages.filter(Message.is_read == False, Message.author_id != user_id).count(),
            'total_messages': self.messages.count()
        }

    def get_conversation_messages(self):
        return [message.get_message_data() for message in self.messages.order_by(Message.id.asc())]
