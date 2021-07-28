from app.models import db, Activity

def seed_activities():
    push_ups1 = Activity(
        sets=3,
        repetitions=20,
        duration=30,
        workout_id=1,
        exercise_id=1
    )
    sit_ups = Activity(
        sets=2,
        repetitions=35,
        duration=12,
        workout_id=1,
        exercise_id=2
    )
    run = Activity(
        sets=1,
        repetitions=1,
        duration=10,
        workout_id=1,
        exercise_id=3
    )
    push_ups2 = Activity(
        sets=5,
        repetitions=10,
        duration=15,
        workout_id=2,
        exercise_id=1
    )
    run2 = Activity(
        sets=1,
        repetitions=1,
        duration=10,
        workout_id=3,
        exercise_id=3
    )

    db.session.add(push_ups1)
    db.session.add(push_ups2)
    db.session.add(sit_ups)
    db.session.add(run)
    db.session.add(run2)

    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()