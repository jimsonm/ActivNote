from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class ActivityForm(FlaskForm) :
    sets = IntegerField('sets', validators=[DataRequired()])
    repetitions = IntegerField('repetitions', validators=[DataRequired()])
    duration = IntegerField('duration')
    exercise_id = IntegerField('exercise_id', validators=[DataRequired()])
    workout = IntegerField('workout_id', validators=[DataRequired()])