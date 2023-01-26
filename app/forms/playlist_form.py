from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
    description = StringField('description')