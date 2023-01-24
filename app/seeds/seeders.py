from app.models import db, User, environment, SCHEMA, Song


# Adds a demo user, you can add other users here if you want
def seed_data():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    tech = User(
        username='2TECH-AUDIO', email='2tech@aa.io', password='password'
    )
    fsm_team = User(
        username='FSM Team', email='FSM@aa.io', password='password'
    )
    mixaund = User(
        username='Mixaund', email='mixaund@aa.io', password='password'
    )
    corpo = User(
        username='Corporate Music Zone', email='corpo@aa.io', password='password'
    )
    fscm = User(
        username='FSCM Productions', email='fscm@aa.io', password='password'
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

    presentation = Song(
        user=tech, title='Presentation 2.0', file_name='2tech_audio-presentation-20.mp3'
    )
    rise = Song(
        user=corpo, title='Rise', file_name='corporate-music-zone-rise.mp3'
    )
    history = Song(
        user=fscm, title='History Repeats Itself', file_name='fscm-productions-history-repeats-itself.mp3'
    )
    neon = Song(
        user=fsm_team, title='Neonscapes', file_name='fsm-team-escp-neonscapes.mp3'
    )
    pos_corpo = Song(
        user=mixaund, title='Positive Corporate', file_name='mixaund-positive-corporate.mp3'
    )

    db.session.add(presentation)
    db.session.add(rise)
    db.session.add(history)
    db.session.add(neon)
    db.session.add(pos_corpo)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM songs")
        
    db.session.commit()