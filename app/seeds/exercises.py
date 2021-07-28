from app.models import db, Exercise

def seed_exercises():
    one = Exercise(
        exercise_name='Push-ups',
        calories_burned=7,
        notes='I want to work on explosive push-ups.',
        user_id=1
    )
    two = Exercise(
        exercise_name='Sit-ups',
        calories_burned=3,
        notes='Can do up to 50 in a set',
        user_id=1
    )
    three = Exercise(
        exercise_name='One Mile Run',
        calories_burned=10,
        notes='Goal is a 6 minute mile.',
        user_id=1
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()

def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()