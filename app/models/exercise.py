from .db import db

class Exercise(db.Model):
    __tablename__= 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String, nullable=False)
    calories_burned = db.Column(db.Integer)
    notes = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='exercises')
    activity = db.relationship('Activity', back_populates='exercise', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'exercise_name': self.exercise_name,
            'calories_burned': self.calories_burned,
            'notes': self.notes,
            'user_id': self.user_id
        }
