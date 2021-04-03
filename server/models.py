import datetime

from flask_login import UserMixin, LoginManager
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
login_manager = LoginManager()


@login_manager.user_loader
def get_user(user_id):
    return User.query.get(user_id)


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


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    messages = db.relationship("Message", backref="conversation", lazy='dynamic')

    def __repr__(self):
        return '<Conversation {}>'.format(self.id)

    def get_conversation_data(self, user_id):
        return {
            'id': self.id,
            'user': [user.get_user_data() for user in self.users if user.id != user_id][0],
            'unread_messages': self.messages.filter(Message.is_read == False).count()
        }

    def get_conversation_messages(self):
        return [{
            'created': message.created,
            'author_id': message.author_id,
            'is_read': message.is_read,
            'text': message.text,
        } for message in self.messages]


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
