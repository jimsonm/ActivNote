from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Workout
from app.forms import WorkoutForm

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

@workout_routes.route('/', methods=['POST'])
@login_required
def createWorkout():
    form= WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout(
            workout_name=form.data['workout_name'],
            track_id=form.data['track_id'],
            user_id=form.data['user_id']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401