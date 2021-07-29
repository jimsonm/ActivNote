from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Exercise

exercise_routes = Blueprint('exercises', __name__)


@exercise_routes.route('/all/<int:id>')
@login_required
def get_exercises_by_userId(id):
    exercises = Exercise.query.filter(Exercise.user_id==id).all()
    return {'exercises': [exercise.to_dict() for exercise in exercises]}


@exercise_routes.route('/<int:id>')
@login_required
def exercise(id):
    exercise = Exercise.query.get(id)
    return exercise.to_dict()
