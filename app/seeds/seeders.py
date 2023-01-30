from app.models import db, User, environment, SCHEMA, Song


# Adds a demo user, you can add other users here if you want
def seed_data():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', gender='male')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', gender='female')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', gender='male')
    tech = User(
        username='2TECH-AUDIO', email='2tech@aa.io', password='password', gender='other'
    )
    fsm_team = User(
        username='FSM Team', email='FSM@aa.io', password='password', gender='other'
    )
    mixaund = User(
        username='Mixaund', email='mixaund@aa.io', password='password', gender='other'
    )
    corpo = User(
        username='Corporate Music Zone', email='corpo@aa.io', password='password', gender='other'
    )
    fscm = User(
        username='FSCM Productions', email='fscm@aa.io', password='password', gender='other'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tech)
    db.session.add(fsm_team)
    db.session.add(mixaund)
    db.session.add(corpo)
    db.session.add(fscm)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.liked_songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM liked_songs")
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM songs")
        db.session.execute("DELETE FROM playlists")

        
    db.session.commit()