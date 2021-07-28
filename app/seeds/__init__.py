from flask.cli import AppGroup
from .users import seed_users, undo_users
from .activities import seed_activities, undo_activities
from .exercises import seed_exercises, undo_exercises
from .tracks import seed_tracks, undo_tracks
from .workouts import seed_workouts, undo_workouts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_exercises()
    seed_tracks()
    seed_workouts()
    seed_activities()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_activities()
    undo_workouts()
    undo_tracks()
    undo_exercises()
    undo_users()
    # Add other undo functions here
