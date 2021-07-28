from app.models import db, Workout

def seed_workouts():
    three_activities = Workout(
        workout_name='Push-ups, Sit-ups, and a Run',
        track_id=1,
        user_id=1
    )
    just_pushups = Workout(
        workout_name='Only push-ups',
        track_id=1,
        user_id=1
    )
    just_run = Workout(
        workout_name="Let's run.",
        track_id=1,
        user_id=1
    )

    db.session.add(three_activities)
    db.session.add(just_pushups)
    db.session.add(just_run)

    db.session.commit()

def undo_workouts():
    db.session.execute('TRUNCATE workouts RESTART IDENTITY CASCADE;')
    db.session.commit()