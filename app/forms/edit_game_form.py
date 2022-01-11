from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class EditGameForm(FlaskForm):
    caption = StringField("caption", validators=[DataRequired()])