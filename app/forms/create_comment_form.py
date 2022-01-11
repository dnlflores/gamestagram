from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class CreateCommentForm(FlaskForm):
  content = StringField("content", validators=[DataRequired()])
