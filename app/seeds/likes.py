from app.models import db, Like

def seed_likes():
    demo_like = Like(
        user_id=1, image_id=2
    )

    db.session.add(demo_like)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
