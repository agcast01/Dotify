from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired,ValidationError
from app.models import Song

def is_mp3(form, field):
    """
    Check if file_name is an mp3
    """
    file_name = field.data
    if not file_name.endswith('mp3'):
        raise ValidationError('File provided must be an mp3.')

class SongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    file_name = FileField('file_name', validators=[DataRequired(), is_mp3])
    userId = IntegerField('userId', validators=[DataRequired()])