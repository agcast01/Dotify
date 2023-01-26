from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, String, Integer, ForeignKey

song_playlist = db.Table(
    "song_playlist",
    db.Column(
        "songId",
        Integer,
        ForeignKey(add_prefix_for_prod('songs.id')),
        primary_key=True
    ),
    db.Column(
        "playlistId",
        Integer,
        ForeignKey(add_prefix_for_prod('playlists.id')),
        primary_key=True
    ),
    schema = SCHEMA if environment == "production" else ''
)


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
    playlists = db.relationship('Playlist', back_populates='user')

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
            'songs': [song.title for song in self.songs],
            'playlists': [playlist.title for playlist in self.playlists]
        }


class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    file_name = Column(String, nullable=False)
    description = Column(String)
    playlistId = Column(Integer, ForeignKey(add_prefix_for_prod('playlists.id')))

    user = db.relationship('User', back_populates='songs')
    playlists = db.relationship(
        "Playlist",
        secondary=song_playlist,
        back_populates='songs'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'file_name': self.file_name,
            'user': self.user.username,
        }

class Playlist(db.Model, UserMixin):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    imageUrl = Column(String)

    user = db.relationship('User', back_populates='playlists')
    songs = db.relationship(
        "Song",
        secondary=song_playlist,
        back_populates='playlists'
    )

    def to_dict(self):
        return {
            "id" : self.id,
            'title': self.title,
            'description': self.description,
            'user': self.user.username,
            'songs': [song.to_dict() for song in self.songs]
        }
