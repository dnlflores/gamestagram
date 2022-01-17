from app.models import db, Image

def seed_images():
    demo_image = Image(
        user_id=1, caption='Favorite Pokemon Game: Yellow', url='https://www.vizzed.com/vizzedboard/retro/user_screenshots/saves23/234873/GAMEGEAR--Pokemon%20Legends_Mar28%2022_51_59.png'
    )
    
    marnies_first_image = Image(
        user_id=2, caption='My first Dragon Quest', url='https://miro.medium.com/max/2560/1*2rV8Yl2wZHWlFqN5XCN6Uw.jpeg'
    )

    bobbie_first_image = Image(
        user_id=3, caption='First Time Playing Sonic', url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3S76P8KQoDiAZ2bNPoo6sw1R2ih0HdaOURw&usqp=CAU'
    )
     
    alejandra_first_image = Image(
        user_id=4, caption='One of my first puzzle games!', url='https://upload.wikimedia.org/wikipedia/en/3/3a/Legend_of_Zelda_NES.PNG'
    )

    drummond_first_image = Image(
        user_id=5, caption='It is crazy how far along Doom has come…', url='https://i.ytimg.com/vi/MnqLJpgq7jc/maxresdefault.jpg'
    )
     
    irwin_first_image = Image(
        user_id=6, caption='Everyones favorite Bandicoot!', url='https://i.ytimg.com/vi/d3_RQU2OJEM/maxresdefault.jpg'
    )

    messiah_first_image = Image(
        user_id=7, caption='The best game out to date. No cap.', url='https://cdn.mos.cms.futurecdn.net/DujKfjN7dzKrgwbyDkEhr6-1200-80.jpg'
    )
     
    seraphine_first_image = Image(
        user_id=8, caption='One of the most beautiful graphics I have ever seen!', url='https://blog.playstation.com/tachyon/2022/01/ca81fa0930eade4a425fec03bfa2aed8827bff7b.jpg'
    )

    maite_first_image = Image(
        user_id=9, caption='My favorite sonic game ever', url='https://m.media-amazon.com/images/M/MV5BMTIyMzgwMDYtZWJiYi00ZTM3LTgyNjctYWQzNGUwMWQxY2RiXkEyXkFqcGdeQXVyNjcyNzkwMTc@._V1_.jpg'
    )
     
    trace_first_image = Image(
        user_id=10, caption='Lets eh go!!', url='https://i.ytimg.com/vi/mv3JyMgwQmI/maxresdefault.jpg'
    )

    audie_first_image = Image(
        user_id=11, caption='Luigi is in trouble!!', url='https://i.ytimg.com/vi/kOquQyswmEw/maxresdefault.jpg'
    )
     
    kelda_first_image = Image(
        user_id=12, caption='The best Zelda game ever!!!', url='https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Ffansided.com%2Ffiles%2F2017%2F01%2Fzelda-one.jpg'
    )

    henri_first_image = Image(
        user_id=13, caption='One of the funnest sonic games ever!!', url='https://m.media-amazon.com/images/I/71xpO1s+BML._SL1280_.jpg'
    )
     
    chet_first_image = Image(
        user_id=14, caption='Can not wait for this game to come out!', url='https://legends.pokemon.com/assets/gameplay/gameplay_battle_2.jpg'
    )

    maddie_first_image = Image(
        user_id=15, caption='Is Miles better than Peter??', url='https://i.gadgets360cdn.com/large/miles_morales_gameplay_1600292492809.jpeg'
    )

    donelle_first_image = Image(
        user_id=16, caption='The best looking Star Wars game!!', url='https://i.gadgets360cdn.com/large/BD_ATST_v11_378974_1_1574238367883.jpg'
    )
     
    nikole_first_image = Image(
        user_id=17, caption='Who does not love this game?', url='https://i.ytimg.com/vi/qRNv3FpnvMg/maxresdefault.jpg'
    )

    zackery_first_image = Image(
        user_id=18, caption='Best fighting game ever.', url='https://www.smashbros.com/assets_v2/img/howtoplay/img_howtoplay0501_pc.jpg'
    )

    db.session.add(demo_image)
    db.session.add(marnies_first_image)
    db.session.add(bobbie_first_image)
    db.session.add(alejandra_first_image)
    db.session.add(drummond_first_image)
    db.session.add(irwin_first_image)
    db.session.add(messiah_first_image)
    db.session.add(seraphine_first_image)
    db.session.add(maite_first_image)
    db.session.add(trace_first_image)
    db.session.add(audie_first_image)
    db.session.add(kelda_first_image)
    db.session.add(henri_first_image)
    db.session.add(chet_first_image)
    db.session.add(maddie_first_image)
    db.session.add(donelle_first_image)
    db.session.add(nikole_first_image)
    db.session.add(zackery_first_image)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
