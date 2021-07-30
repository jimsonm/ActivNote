from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ExerciseForm(FlaskForm):
    exercise_name = StringField('exercise_name', validators=[DataRequired()])
    calories_burned = IntegerField('calories_burned')
    notes = StringField('notes')
    user_id = IntegerField('user_id', validators=[DataRequired()])