from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired,ValidationError
from app.models import Song

class SongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])