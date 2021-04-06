import datetime

from . import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_read = db.Column(db.Boolean, default=False)
    text = db.Column(db.Text())

    def __repr__(self):
        return '<Message {}>'.format(self.id)

    def get_message_data(self):
        return {
            'id': self.id,
            'created': self.created,
            'author_id': self.author_id,
            'is_read': self.is_read,
            'text': self.text,
        }
