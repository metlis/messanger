from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .conversation import Conversation


conversation_association = db.Table('conversation_association', db.Model.metadata,
                                    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                                    db.Column('conversation_id', db.Integer, db.ForeignKey('conversations.id'))
                                    )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    conversations = db.relationship("Conversation", secondary=conversation_association, backref="users")
    messages = db.relationship("Message", backref="author")

    def __init__(self, username, password, email):
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def get_user_conversations(self):
        conversations = Conversation.query.filter(Conversation.users.any(id=self.id)).all()
        return [c.get_conversation_data(self.id) for c in conversations]

    def get_user_data(self):
        return {
            'id': self.id,
            'username': self.username,
        }
