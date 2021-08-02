from .db import db

class Workout(db.Model):
    __tablename__= 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    workout_name = db.Column(db.String, nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='workouts')
    activities = db.relationship('Activity', back_populates='workout', passive_deletes=True, cascade="all, delete")
    track = db.relationship('Track', back_populates='workout', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'workout_name': self.workout_name,
            'track_id': self.track_id,
            'user_id': self.user_id
        }
