from app.models import db, Exercise

def seed_exercises():
    one = Exercise(
        exercise_name='Push-ups',
        calories_burned=7,
        notes='{"blocks":[{"key":"t76n","text":"Test!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        user_id=1
    )
    two = Exercise(
        exercise_name='Sit-ups',
        calories_burned=3,
        notes='{"blocks":[{"key":"t76n","text":"Test!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        user_id=1
    )
    three = Exercise(
        exercise_name='One Mile Run',
        calories_burned=10,
        notes='{"blocks":[{"key":"t76n","text":"Test!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        user_id=1
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()

def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()