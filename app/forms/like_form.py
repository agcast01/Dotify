from flask_wtf import FlaskForm
from wtforms import IntegerField

class LikeForm(FlaskForm):
    userId = IntegerField('userId')