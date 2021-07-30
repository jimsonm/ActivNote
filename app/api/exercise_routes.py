from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Exercise

exercise_routes = Blueprint('exercises', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@exercise_routes.route('/<int:exerciseId>', methods=['PUT'])
@login_required
def updateExercise(exerciseId):
    exercise = Exercise.query.get(exerciseId)
    if exercise is None:
        return {'message': 'No exercise found'}, 404
    data = request.get_json()
    exercise.exercise_name = data['name']
    exercise.calories_burned = data['calories']
    exercise.notes = data['notes']
    db.session.commit()
    return exercise.to_dict()

@exercise_routes.route('/<int:exerciseId>', methods=['DELETE'])
@login_required
def deleteExercise(exerciseId):
    exercise = Exercise.query.get(exerciseId)
    db.session.delete(exercise)
    db.session.commit()
    return {'message': 'Exercise removed'}