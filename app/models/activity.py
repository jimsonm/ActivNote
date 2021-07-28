from .db import db

class Activity(db.Model):
    __tablename__= 'activities'

    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    workout = db.relationship('Workout', back_populates='activities')
    exercise = db.relationship('Exercise', back_populates='activity')

    def to_dict(self):
        return {
            'id': self.id,
            'sets': self.sets,
            'repetitions': self.repetitions,
            'duration': self.duration,
            'exercise_id': self.exercise_id
        }
