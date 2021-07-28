from .db import db

class Track(db.Model):
    __tablename__= 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    track_url = db.Column(db.String, nullable=False)

    workout = db.relationship('Workout', back_populates='track')

    def to_dict(self):
        return {
            'track_url': self.track_url
        }