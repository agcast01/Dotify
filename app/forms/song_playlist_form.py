from flask_wtf import FlaskForm
from wtforms import IntegerField

class SongPlaylistForm(FlaskForm):
    songId = IntegerField('songId')