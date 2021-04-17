from datetime import datetime, timezone
from wsgiref.handlers import format_date_time

from . import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_read = db.Column(db.Boolean, default=False)
    text = db.Column(db.Text())

    def __repr__(self):
        return '<Message {}>'.format(self.id)

    def get_message_data(self):
        utc_time = self.created.replace(tzinfo=timezone.utc)
        return {
            'id': self.id,
            'created': format_date_time(utc_time.timestamp()),
            'author_id': self.author_id,
            'author_username': self.author.username,
            'is_read': self.is_read,
            'text': self.text,
        }

    def mark_as_read(self):
        self.is_read = True
