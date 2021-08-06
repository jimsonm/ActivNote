from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Workout
# from app.forms import ExerciseForm

workout_routes = Blueprint('workouts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@workout_routes.route('/all/<int:id>')
@login_required
def get_workouts_by_userId(id):
    workouts = Workout.query.filter(Workout.user_id==id).all()
    return {'workouts': [workout.to_dict() for workout in workouts]}


@workout_routes.route('/<int:id>')
@login_required
def workout(id):
    workout = Workout.query.get(id)
    return workout.to_dict()

# @exercise_routes.route('/<int:exerciseId>', methods=['PUT'])
# @login_required
# def updateExercise(exerciseId):
#     exercise = Exercise.query.get(exerciseId)
#     if exercise is None:
#         return {'message': 'No exercise found'}, 404
#     data = request.get_json()
#     exercise.exercise_name = data['name']
#     exercise.calories_burned = data['calories']
#     exercise.notes = data['notes']
#     db.session.commit()
#     return exercise.to_dict()

@workout_routes.route('/<int:workoutId>', methods=['PUT'])
@login_required
def updateWorkout(workoutId):
    workout = Workout.query.get(workoutId)
    if workout is None:
        return {'message': 'No workout found'}, 404
    data = request.get_json()
    workout.workout_name = data['workout_name']
    db.session.commit()
    return workout.to_dict()

@workout_routes.route('/<int:workoutId>', methods=['DELETE'])
@login_required
def deleteWorkout(workoutId):
    workout = Workout.query.get(workoutId)
    db.session.delete(workout)
    db.session.commit()
    return {'message': 'Workout removed'}

# @exercise_routes.route('/<int:exerciseId>', methods=['DELETE'])
# @login_required
# def deleteExercise(exerciseId):
#     exercise = Exercise.query.get(exerciseId)
#     db.session.delete(exercise)
#     db.session.commit()
#     return {'message': 'Exercise removed'}

# @exercise_routes.route('/', methods=['POST'])
# @login_required
# def createExercise():
#     form = ExerciseForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         exercise = Exercise(
#             exercise_name=form.data['exercise_name'],
#             calories_burned=form.data['calories_burned'],
#             notes=form.data['notes'],
#             user_id=form.data['user_id']
#         )
#         db.session.add(exercise)
#         db.session.commit()
#         return exercise.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401 