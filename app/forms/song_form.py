from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Song

class SongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
    description = StringField('description')
    albumId = IntegerField('albumId')
    length = StringField('length')