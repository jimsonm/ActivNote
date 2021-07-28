from app.models import db, Track

def seed_tracks():
    thankyounext = Track(
        track_url='https://melody-nimbus.s3-us-west-1.amazonaws.com/Ariana+Grande+-+thank+u%2C+next+(Lyrics).mp3'
    )

    db.session.add(thankyounext)

    db.session.commit()

def undo_tracks():
    db.session.execute('TRUNCATE tracks RESTART IDENTITY CASCADE;')
    db.session.commit()