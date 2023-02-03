from app.models import db, User, environment, SCHEMA, Song, Album, Playlist


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

    mahler = User(
        username='Gustav Mahler', email='mahler@aa.io', password='password', gender='male'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tech)
    db.session.add(fsm_team)
    db.session.add(mixaund)
    db.session.add(corpo)
    db.session.add(fscm)
    db.session.add(mahler)
    db.session.commit()

    albums = [
    Album(
        title='Presentation 2.0', userId=4, imageUrl="http://dotify-bucket.s3.amazonaws.com/9072e234785c498ca3b436b72b07fa8e.jpg"
    ),
    Album(
        title='Neonscapes ft. ESCP', userId=5, imageUrl="http://dotify-bucket.s3.amazonaws.com/4c3b488659a541b8af935c2a8be3a978.jpg"
    ),
    Album(
        title='Positive Corporate', userId=6, imageUrl="http://dotify-bucket.s3.amazonaws.com/e40fb82d74e6433197875cb643104c8f.jpg"
    ),
    Album(
        title='Rise', userId=7, imageUrl="http://dotify-bucket.s3.amazonaws.com/eb5976de13c24377aaf699b3da26213d.jpg"
    ),
    Album(
        title='Symphony No.5', userId=9
    ),
    Album (
        title='Symphony No.1', userId=9
    ),
    Album(
        title='Presentation', userId=4, imageUrl="http://dotify-bucket.s3.amazonaws.com/bdbeb68f9f4e454a95c91da9799abaab.jpg"
    ),
    Album(
        title='Together', userId=4, imageUrl="http://dotify-bucket.s3.amazonaws.com/26ad7f5212364037a148ebd3717140fa.jpg"
    ),
    Album(
        title='Stay Positive', userId=6, imageUrl="http://dotify-bucket.s3.amazonaws.com/bf94ede14bd7482482f119a2ae5e07ec.jpg"
    ),
    Album(
        title='Brighten Your Day', userId=6, imageUrl="http://dotify-bucket.s3.amazonaws.com/210551ba615d40ac93cc826995ec3ba2.jpg"
    )]

    for album in albums:
        db.session.add(album)
        db.session.commit()

    playlists = [
        Playlist(
            title="Mahler's Greatest Hits", userId=9, description='Some of his greatest works.'
        ),
        Playlist(
            title="Good Vibes", userId=6, imageUrl="http://dotify-bucket.s3.amazonaws.com/56d61c8db0544ed7b583477ddeefa9c0.jpg"
        )
    ]

    for playlist in playlists:
        db.session.add(playlist)
        db.session.commit()
    
    songs = [
        Song(
            title='Presentation 2.0', albumId=1, file_name="https://dotify-bucket.s3.amazonaws.com/cf20c0cd98774eba841c9ac00e75c01c.mp3", userId=4, length='2:14'
        ),
        Song(
            title='Neonscapes ft. ESCP', albumId=2, file_name="https://dotify-bucket.s3.amazonaws.com/a989768f4ced4a90beeb0d56e04875fa.mp3", userId=5, length='4:22'
        ),
        Song(
            albumId=3, title='Positive Corporate', userId=6, file_name="https://dotify-bucket.s3.amazonaws.com/6e1f455efcac4097b6fef7e102d1a5ad.mp3", length='3:27'
        ),
        Song(
            albumId=4, file_name="https://dotify-bucket.s3.amazonaws.com/b3573b599adc46e68c7f06e431767aed.mp3", title='Rise', userId=7, length='2:45'
        ),
        Song(
            albumId=5, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/324e9e2357694133b21fa9d10aea566c.mp3", title='Mvt 1 Trauermarsch', length='11:33'
        ),
        Song(
            albumId=5, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/3b73b3cb385b42ec9a3cd2b74f0579b0.mp3", title='Mvt 2 Sturmisch Bewegt', length='12:57'
        ),
        Song(
            albumId=5, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/1595d1f71825415791a3a77c17fa7876.mp3", title='Mvt 3 Scherzo', length='17:21'
        ),
        Song(
            albumId=5, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/41b51de6069c42768a9be757562c505f.mp3", title="Mvt 4 Adagietto & 5 Rondo-Finale ", length='22:28'
        ),
        Song(
            albumId=6, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/64359d7d47de43a5b15cbfc1f43fe3d8.mp3", title="Mvt 1 Langsam Schleppend", length='15:55'
        ),
        Song(
            albumId=6, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/53a71204f40c4eb7a29f585c67bc42cd.mp3", title="Mvt 2 Kraftig Bewegt", length='7:21'
        ),
        Song(
            albumId=6, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/6523fe80cb0b448da5e337512334c953.mp3", title="Mvt 3 Feierlich und Gemessen", length='10:23'
        ),
        Song(
            albumId=6, userId=9, file_name="https://dotify-bucket.s3.amazonaws.com/2793a0e4d6ad4ff382668918c00df70f.mp3", title="Mvt 4 Sturmisch Bewegt", length='18:30'
        ),
        Song(
            albumId=7, userId=4, file_name="https://dotify-bucket.s3.amazonaws.com/23b5bcbdc8954dda8422fc4b9d6afc03.mp3", title='Presentation', length='2:31'
        ),
        Song(
            albumId=8, userId=4, file_name="https://dotify-bucket.s3.amazonaws.com/055f173b09a4494aa2a74dac8bac2e84.mp3", title='Together', length='3:50'
        ),
        Song(
            albumId=9, userId=6, file_name="https://dotify-bucket.s3.amazonaws.com/498f72e648a940689b05c9a1a8c4d352.mp3", title='Stay Positive', length='3:54'
        ),
        Song(
            albumId=10, userId=6, file_name="https://dotify-bucket.s3.amazonaws.com/45cb7adf7ba64c93a259d5fc03886812.mp3", title='Brighten Your Day', length='3:53'
        )
    ]

    for song in songs:
        db.session.add(song)
        db.session.commit()

    mahler = Playlist.query.get(1)
    song1 = Song.query.get(8)
    song2 = Song.query.get(9)
    song3 = Song.query.get(10)
    mahler.songs.append(song2)
    mahler.songs.append(song3)
    mahler.songs.append(song1)
    db.session.commit()

    good = Playlist.query.get(2)
    song4 = Song.query.get(15)
    song5 = Song.query.get(3)
    good.songs.append(song4)
    good.songs.append(song5)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_song_likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_song_likes")
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM songs")
        db.session.execute("DELETE FROM playlists")
        db.session.execute("DELETE FROM albums")

        
    db.session.commit()