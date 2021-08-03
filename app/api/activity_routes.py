from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Activity
# from app.forms import ExerciseForm

activity_routes = Blueprint('activities', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@activity_routes.route('/all/<int:id>')
@login_required
def get_activities_by_workoutId(id):
    activities = Activity.query.filter(Activity.workout_id==id).all()
    return {'activities': [activity.to_dict() for activity in activities]}

@activity_routes.route('/<int:activityId>', methods=['PUT'])
@login_required
def updateActivity(activityId):
    activity = Activity.query.get(activityId)
    if activity is None:
        return {'message': 'No activity found'}, 404
    data = request.get_json()
    activity.duration = data['sets']
    activity.repetitions = data['reps']
    activity.duration = data['duration']
    db.session.commit()
    return activity.to_dict()

@activity_routes.route('/<int:activityId>', methods=['DELETE'])
@login_required
def deleteActivity(activityId):
    activity = Activity.query.get(activityId)
    db.session.delete(activity)
    db.session.commit()
    return {'message': 'Activity removed'}