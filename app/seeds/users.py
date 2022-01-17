from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@gamestagram.com', password='password')
    marnie = User(
        username='Marnie', email='marnie@gamestagram.com', password='password')
    bobbie = User(
        username='Bobbie', email='bobbie@gamestagram.com', password='password')
    alejandra = User(
        username='Alejandra', email='alejandra@gamestagram.com', password='password')
    drummond = User(
        username='Drummond', email='drummond@gamestagram.com', password='password')
    irwin = User(
        username='Irwin', email='irwin@gamestagram.com', password='password')
    messiah = User(
        username='Messiah', email='messiah@gamestagram.com', password='password')
    seraphine = User(
        username='Seraphine', email='seraphine@gamestagram.com', password='password')
    maite = User(
        username='Maite', email='maite@gamestagram.com', password='password')
    trace = User(
        username='Trace', email='trace@gamestagram.com', password='password')
    audie = User(
        username='Audie', email='audie@gamestagram.com', password='password')
    kelda = User(
        username='Kelda', email='kelda@gamestagram.com', password='password')
    henri = User(
        username='Henri', email='henri@gamestagram.com', password='password')
    chet = User(
        username='Chet', email='chet@gamestagram.com', password='password')
    maddie = User(
        username='Maddie', email='maddie@gamestagram.com', password='password')
    donelle = User(
        username='Donelle', email='donelle@gamestagram.com', password='password')
    nikole = User(
        username='Nikole', email='nikole@gamestagram.com', password='password')
    zackery = User(
        username='Zackery', email='zackery@gamestagram.com', password='password')

    demo.following.append(zackery)
    demo.following.append(nikole)
    demo.following.append(donelle)
    demo.following.append(maddie)

    demo.followers.append(marnie)
    demo.followers.append(bobbie)
    demo.followers.append(maite)
    demo.followers.append(kelda)
    demo.followers.append(zackery)
    demo.followers.append(nikole)
    demo.followers.append(maddie)

    marnie.following.append(bobbie)
    marnie.following.append(demo)
    marnie.following.append(irwin)
    marnie.following.append(maddie)
    marnie.following.append(kelda)
    marnie.following.append(nikole)

    marnie.followers.append(irwin)
    marnie.followers.append(bobbie)
    marnie.followers.append(maite)
    marnie.followers.append(kelda)
    marnie.followers.append(demo)

    bobbie.following.append(zackery)
    bobbie.following.append(nikole)
    bobbie.following.append(chet)
    bobbie.following.append(maddie)
    bobbie.following.append(alejandra)

    bobbie.followers.append(marnie)
    bobbie.followers.append(chet)
    bobbie.followers.append(maite)
    bobbie.followers.append(kelda)
    bobbie.followers.append(zackery)
    bobbie.followers.append(nikole)

    alejandra.following.append(drummond)
    alejandra.following.append(nikole)
    alejandra.following.append(demo)
    alejandra.following.append(maddie)

    alejandra.followers.append(drummond)
    alejandra.followers.append(bobbie)
    alejandra.followers.append(maite)
    alejandra.followers.append(demo)
    alejandra.followers.append(zackery)
    alejandra.followers.append(marnie)
    alejandra.followers.append(maddie)

    drummond.following.append(chet)
    drummond.following.append(nikole)
    drummond.following.append(donelle)
    drummond.following.append(maddie)
    drummond.following.append(demo)

    drummond.followers.append(marnie)
    drummond.followers.append(bobbie)
    drummond.followers.append(maite)
    drummond.followers.append(kelda)
    drummond.followers.append(zackery)
    drummond.followers.append(nikole)
    drummond.followers.append(maddie)

    irwin.following.append(zackery)
    irwin.following.append(nikole)
    irwin.following.append(donelle)
    irwin.following.append(maddie)
    irwin.following.append(marnie)

    irwin.followers.append(bobbie)
    irwin.followers.append(kelda)
    irwin.followers.append(zackery)
    irwin.followers.append(nikole)
    irwin.followers.append(maddie)

    messiah.following.append(trace)
    messiah.following.append(nikole)
    messiah.following.append(donelle)
    messiah.following.append(maddie)
    messiah.following.append(maite)
    messiah.following.append(seraphine)

    messiah.followers.append(marnie)
    messiah.followers.append(bobbie)
    messiah.followers.append(maite)
    messiah.followers.append(kelda)
    messiah.followers.append(zackery)
    messiah.followers.append(nikole)
    messiah.followers.append(maddie)
    messiah.followers.append(seraphine)
    messiah.followers.append(trace)

    seraphine.following.append(audie)
    seraphine.following.append(demo)
    seraphine.following.append(trace)
    seraphine.following.append(maddie)
    seraphine.following.append(kelda)
    seraphine.following.append(nikole)
    seraphine.following.append(henri)

    seraphine.followers.append(irwin)
    seraphine.followers.append(audie)
    seraphine.followers.append(maite)
    seraphine.followers.append(kelda)
    seraphine.followers.append(demo)
    seraphine.followers.append(zackery)

    maite.following.append(marnie)
    maite.following.append(seraphine)
    maite.following.append(chet)
    maite.following.append(maddie)
    maite.following.append(alejandra)
    maite.following.append(bobbie)

    maite.followers.append(marnie)
    maite.followers.append(chet)
    maite.followers.append(audie)
    maite.followers.append(kelda)
    maite.followers.append(zackery)
    maite.followers.append(nikole)

    trace.following.append(drummond)
    trace.following.append(bobbie)
    trace.following.append(nikole)
    trace.following.append(demo)
    trace.following.append(maddie)
    trace.following.append(zackery)
    trace.following.append(seraphine)

    trace.followers.append(drummond)
    trace.followers.append(bobbie)
    trace.followers.append(maite)
    trace.followers.append(demo)
    trace.followers.append(zackery)
    trace.followers.append(marnie)
    trace.followers.append(maddie)

    audie.following.append(chet)
    audie.following.append(nikole)
    audie.following.append(donelle)
    audie.following.append(maddie)
    audie.following.append(trace)
    audie.following.append(demo)
    audie.following.append(henri)

    audie.followers.append(marnie)
    audie.followers.append(bobbie)
    audie.followers.append(maite)
    audie.followers.append(seraphine)
    audie.followers.append(zackery)
    audie.followers.append(nikole)
    audie.followers.append(maddie)
    
    kelda.following.append(zackery)
    kelda.following.append(trace)
    kelda.following.append(maddie)
    kelda.following.append(marnie)
    kelda.following.append(henri)

    kelda.followers.append(seraphine)
    kelda.followers.append(henri)
    kelda.followers.append(zackery)
    kelda.followers.append(nikole)
    kelda.followers.append(maddie)

    henri.following.append(trace)
    henri.following.append(nikole)
    henri.following.append(donelle)
    henri.following.append(maddie)
    henri.following.append(maite)
    henri.following.append(seraphine)

    henri.followers.append(marnie)
    henri.followers.append(bobbie)
    henri.followers.append(maite)
    henri.followers.append(kelda)
    henri.followers.append(zackery)
    henri.followers.append(nikole)
    henri.followers.append(maddie)
    henri.followers.append(seraphine)
    henri.followers.append(trace)

    chet.following.append(demo)
    chet.following.append(trace)
    chet.following.append(maddie)
    chet.following.append(kelda)
    chet.following.append(nikole)

    chet.followers.append(irwin)
    chet.followers.append(seraphine)
    chet.followers.append(maite)
    chet.followers.append(kelda)
    chet.followers.append(demo)
    chet.followers.append(zackery)

    maddie.following.append(marnie)
    maddie.following.append(seraphine)
    maddie.following.append(chet)
    maddie.following.append(zackery)
    maddie.following.append(alejandra)
    maddie.following.append(bobbie)

    maddie.followers.append(marnie)
    maddie.followers.append(chet)
    maddie.followers.append(maite)
    maddie.followers.append(kelda)
    maddie.followers.append(zackery)
    maddie.followers.append(nikole)

    donelle.following.append(drummond)
    donelle.following.append(nikole)
    donelle.following.append(demo)
    donelle.following.append(maddie)
    donelle.following.append(bobbie)
    donelle.following.append(zackery)
    donelle.following.append(seraphine)

    donelle.followers.append(drummond)
    donelle.followers.append(bobbie)
    donelle.followers.append(maite)
    donelle.followers.append(demo)
    donelle.followers.append(zackery)
    donelle.followers.append(marnie)
    donelle.followers.append(maddie)

    nikole.following.append(chet)
    nikole.following.append(seraphine)
    nikole.following.append(donelle)
    nikole.following.append(maddie)
    nikole.following.append(trace)
    nikole.following.append(demo)

    nikole.followers.append(marnie)
    nikole.followers.append(bobbie)
    nikole.followers.append(maite)
    nikole.followers.append(seraphine)
    nikole.followers.append(zackery)
    nikole.followers.append(maddie)
    
    zackery.following.append(seraphine)
    zackery.following.append(trace)
    zackery.following.append(maddie)
    zackery.following.append(marnie)
    zackery.following.append(demo)
    zackery.following.append(alejandra)

    zackery.followers.append(seraphine)
    zackery.followers.append(kelda)
    zackery.followers.append(nikole)
    zackery.followers.append(maddie)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alejandra)
    db.session.add(drummond)
    db.session.add(irwin)
    db.session.add(messiah)
    db.session.add(seraphine)
    db.session.add(maite)
    db.session.add(trace)
    db.session.add(audie)
    db.session.add(kelda)
    db.session.add(henri)
    db.session.add(chet)
    db.session.add(maddie)
    db.session.add(donelle)
    db.session.add(nikole)
    db.session.add(zackery)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
