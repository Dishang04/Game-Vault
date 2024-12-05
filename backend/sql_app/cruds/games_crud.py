from sqlalchemy.orm import Session
from sqlalchemy import func

from . import schemas
from sql_app import models

# Added games

def check_if_added(db: Session, game: schemas.Game):
    """
    Check if a game is already added to the 'Added' table.
    If it is, return the existing game. If not, add it to the table and return the new game.
    """
    db_game = db.query(models.Added).filter(models.Added.owner_id == game.user_id and models.Added.game_id == game.game_id).first()
    print("check succesful")
    if not db_game:
        db_game = models.Added(
            game_id=game.game_id,
            owner_id=game.user_id  
        )
        print("created db_game")
        db.add(db_game)
        print("add db_game")
        db.commit()
        print("db commit")
        db.refresh(db_game)
        print("db refresh")
    print("Succesfully added to database")
    return db_game

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
    db_game = get_added_game_info(game)

    my_game = models.Currently(added_game_id=db_game.id)

    db.add(my_game)
    db.commit()
    db.refresh(my_game)
    return my_game

def get_currently_playing(db: Session, user_id: int):
    return db.query(models.Currently).join(models.Added).filter(
        models.Added.owner_id == user_id
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
    db_game = get_added_game_info(game)

    my_game = models.Finished(added_game_id=db_game.id)

    db.add(my_game)
    db.commit()
    db.refresh(my_game)
    return my_game

def get_finished(db: Session, user_id: int):
    return db.query(models.Finished).join(models.Added).filter(
        models.Added.owner_id == user_id
    ).all()

def find_finished_game(db: Session, game_id: int, user_id: int):
    return db.query(models.Finished).join(models.Added).filter(
        models.Added.owner_id == user_id,
        models.Added.game_id == game_id
    ).first()

def delete_from_finished(db: Session, finished_gameid: int, user_id: int):
    db_finished_item = db.query(models.Finished).filter(models.Finished.owner_id == user_id and models.Finished.game_id == finished_gameid).first()
    
    db.delete(db_finished_item)
    db.commit()
    return {"detail": "Finished list item deleted successfully"}