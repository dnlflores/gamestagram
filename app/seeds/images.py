from app.models import db, Image

def seed_images():
    demo_image = Image(
        user_id=1, caption='Favorite Pokemon Game: Yellow', url='https://www.vizzed.com/vizzedboard/retro/user_screenshots/saves23/234873/GAMEGEAR--Pokemon%20Legends_Mar28%2022_51_59.png'
    )
    
    marnies_first_image = Image(
        user_id=2, caption='Standing on a mountain', url='https://miro.medium.com/max/2560/1*2rV8Yl2wZHWlFqN5XCN6Uw.jpeg'
    )

    bobbie_first_image = Image(
        user_id=3, caption='First Time Playing Sonic', url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3S76P8KQoDiAZ2bNPoo6sw1R2ih0HdaOURw&usqp=CAU'
    )

    db.session.add(demo_image)
    db.session.add(marnies_first_image)
    db.session.add(bobbie_first_image)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
