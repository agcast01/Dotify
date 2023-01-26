from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, String, Integer, ForeignKey


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    month = Column(Integer )
    day = Column(Integer)
    year = Column(Integer)
    gender = Column(String, nullable=False)

    songs = db.relationship('Song', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'songs': [song.title for song in self.songs]
        }


class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    file_name = Column(String, nullable=False)

    user = db.relationship('User', back_populates='songs')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'file_name': self.file_name,
            'user': self.user.username
        }