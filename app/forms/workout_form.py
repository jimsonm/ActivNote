from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class WorkoutForm(FlaskForm):
    workout_name = StringField('exercise_name', validators=[DataRequired()])
    track_id = IntegerField('track_id')
    user_id = IntegerField('user_id', validators=[DataRequired()])