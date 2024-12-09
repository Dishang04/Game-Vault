from sqlalchemy.orm import Session
from sqlalchemy import and_, func

from . import schemas
from sql_app import models

# Added games

def add_game(db: Session, game: schemas.Game):
    print("user %s", game.user_id)
    print("game %s", game.game_id)
    db_game = models.Added(
        game_id=game.game_id,
        owner_id=game.user_id  
    )
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game


def game_exists(db: Session, game: schemas.Game):
    print("game id %s", game.game_id)
    print("user id %s", game.user_id)
    # q = db.query(models.Added).filter( and_(models.Added.game_id.like(game.game_id) , models.Added.owner_id.like(game.user_id)))
    # match = db.query(q.all()).scalar()

    matches = db.query(models.Added).filter( and_(models.Added.game_id.like(game.game_id) , models.Added.owner_id.like(game.user_id))).first()
    print(matches)
    # print("Match is %s", matches.game_id)
    # print("Match is %s", matches.owner_id)

    # exists = db.query(q.exists()).scalar()
    # print("Exists is %s", exists)
    return matches is not None


def check_all_deleted(db: Session, game_id: int, user_id: int):
    my_games = db.query(models.MyGames).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()
    
    currently = db.query(models.Currently).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()
    
    finished = db.query(models.Finished).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

    if not my_games and not currently and not finished:
        return True
    
    return False



def get_added_game_info(db: Session, game: schemas.Game):
    return db.query(models.Added).filter(models.Added.owner_id == game.user_id and models.Added.game_id == game.game_id).first()
 

def delete_added_game(db: Session, added_game_id: int):
    added_game = db.query(models.Added).filter(models.Added.id == added_game_id)

    db.delete(added_game)
    db.commit

# My Games

def add_my_game(db: Session, game: schemas.Game):
    db_game = get_added_game_info(db=db, game=game)
    print("gotten added game info")

    my_game = models.MyGames(added_game_id=db_game.id)

    db.add(my_game)
    db.commit()
    print("added game to mygames")
    db.refresh(my_game)
    return my_game

def get_my_games(db: Session, user_id: int):
    return db.query(models.Added).filter(
        models.Added.owner_id == user_id
    ).all()

# def get_my_games(db: Session, user_id: int):
#     return db.query(models.MyGames).join(models.MyGames.added_game).filter(
#         models.Added.owner_id == user_id
#     ).all()

def find_my_game(db: Session, game_id: int, user_id: int):
    return db.query(models.MyGames).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

def delete_from_my_games(db: Session, my_game_id: int, user_id: int):
    my_games_item = db.query(models.MyGames).filter(models.MyGames.owner_id == user_id and models.MyGames.game_id == my_game_id).first()
    
    db.delete(my_games_item)
    db.commit()
    return {"detail": "MyGames item deleted successfully"}


# Wishlist

def add_to_wishlist(db: Session, game: schemas.Game):
    db_game = get_added_game_info(game)

    my_game = models.WishList(added_game_id=db_game.id)

    db.add(my_game)
    db.commit()
    db.refresh(my_game)
    return my_game

def get_wishlist(db: Session, user_id: int):    
    return db.query(models.WishList).join(models.Added).filter(
        models.Added.owner_id == user_id
    ).all()

def find_wishlist_game(db: Session, game_id: int, user_id: int):
    return db.query(models.WishList).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

def delete_from_wishlist(db: Session, wishlist_gameid: int, user_id: int):
    db_wishlist_item = db.query(models.WishList).filter(models.WishList.owner == user_id and models.WishList.game_id == wishlist_gameid).first()

    db.delete(db_wishlist_item)
    db.commit()
    return {"detail": "Wishlist item deleted successfully"}

# Currently Playing

def add_to_currently_playing(db: Session, game: schemas.Game):
    print(game)
    db_game = get_added_game_info(db=db, game=game)

    my_game = models.Currently(added_game_id=db_game.id, game_id=game.game_id)

    db.add(my_game)
    db.commit()
    db.refresh(my_game)
    return my_game
    

def game_already_playing(db: Session, game: schemas.Game):
    print("test2")
    print("game id %s", game.game_id)
    print("user id %s", game.user_id)
    # q = db.query(models.Currently).filter( and_(models.Currently.game_id.like(game.game_id) , models.Currently.owner_id.like(game.user_id)))
    # match = db.query(q.all()).scalar()

    matches = db.query(models.Currently).filter( and_(models.Currently.added_game_id.like(game.game_id))).first()
    print(matches)
    # print("Match is %s", matches.game_id)
    # print("Match is %s", matches.owner_id)

    # exists = db.query(q.exists()).scalar()
    # print("Exists is %s", exists)
    return matches is not None


def get_currently_playing(db: Session, user_id: int):
    print("get currenly playing")
    return db.query(models.Currently).filter(
        models.Currently.added_game_id == user_id  #added_game_id is here owner_id
    ).all()


def find_currently_playing_game(db: Session, game_id: int, user_id: int):
    return db.query(models.Currently).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

def delete_from_currently_playing(db: Session, currently_playing_gameid: int, user_id: int):
    db_currently_playing_item = db.query(models.Currently).filter(models.Currently.owner_id == user_id and models.Currently.game_id == currently_playing_gameid).first()

    db.delete(db_currently_playing_item)
    db.commit()
    return {"detail": "Currently playing item deleted successfully"}


# Finished Games

def add_to_finished(db: Session, game: schemas.Game):
    print(game)
    print("reached add to finsiehd")
    db_game = get_added_game_info(db=db, game=game)

    my_game = models.Finished(added_game_id=db_game.id, game_id=game.game_id)
    print("my game")
    print(my_game)

    db.add(my_game)
    db.commit()
    db.refresh(my_game)
    return my_game

# def add_to_currently_playing(db: Session, game: schemas.Game):
#     print(game)
#     db_game = get_added_game_info(db=db, game=game)

#     my_game = models.Currently(added_game_id=db_game.id, game_id=game.game_id)

#     db.add(my_game)
#     db.commit()
#     db.refresh(my_game)
#     return my_game

def get_finished(db: Session, user_id: int):
    return db.query(models.Finished).join(models.Added).filter(
        models.Added.owner_id == user_id
    ).all()

def find_finished_game(db: Session, game_id: int, user_id: int):
    return db.query(models.Finished).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

def game_already_played(db: Session, game: schemas.Game):
    print("test2")
    print("game id %s", game.game_id)
    print("user id %s", game.user_id)
    # q = db.query(models.Currently).filter( and_(models.Currently.game_id.like(game.game_id) , models.Currently.owner_id.like(game.user_id)))
    # match = db.query(q.all()).scalar()

    matches = db.query(models.Finished).filter( and_(models.Finished.added_game_id.like(game.game_id))).first()
    print("test3.5")
    print(matches)
    # print("Match is %s", matches.game_id)
    # print("Match is %s", matches.owner_id)

    # exists = db.query(q.exists()).scalar()
    # print("Exists is %s", exists)
    return matches is not None

def delete_from_finished(db: Session, finished_gameid: int, user_id: int):
    db_finished_item = db.query(models.Finished).filter(models.Finished.owner_id == user_id and models.Finished.game_id == finished_gameid).first()
    
    db.delete(db_finished_item)
    db.commit()
    return {"detail": "Finished list item deleted successfully"}