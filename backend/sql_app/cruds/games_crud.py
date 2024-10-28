from sqlalchemy.orm import Session

from . import schemas
from sql_app import models

# My Games
def add_my_game(db: Session, game: schemas.Game, owner_id: int):
    db_game = models.MyGames(
        owner_id=owner_id
    )
    
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

def get_my_games(db: Session, user_id: int):
    my_games_items = db.query(models.MyGames).filter(models.MyGames.owner_id == user_id).all()

    if not my_games_items:
        return None
    
    return my_games_items


def delete_from_my_games(db: Session, my_game_item_id: int):
    my_games_items = db.query(models.MyGames).filter(models.MyGames.id == my_game_item_id).first()
    
    if my_games_items is None:
        return None
    
    db.delete(my_games_items)
    db.commit()
    return {"detail": "MyGames item deleted successfully"}


# Wishlist
def add_to_wishlist(db: Session, game: schemas.Game, owner_id: int):
    db_wishlist_item = models.WishList(
        game_id=game.game_id,
        game_name=game.game_name,
        owner_id=owner_id 
    )
    
    db.add(db_wishlist_item)
    db.commit()
    db.refresh(db_wishlist_item)

    return db_wishlist_item

def get_wishlist(db: Session, user_id: int):
    wishlist_items = db.query(models.WishList).filter(models.WishList.owner_id == user_id).all()

    if not wishlist_items:
        return None
    
    return wishlist_items


def delete_from_wishlist(db: Session, wishlist_item_id: int):
    db_wishlist_item = db.query(models.WishList).filter(models.WishList.id == wishlist_item_id).first()
    
    if db_wishlist_item is None:
        return None
    
    db.delete(db_wishlist_item)
    db.commit()
    return {"detail": "Wishlist item deleted successfully"}

# Currently Playing
def add_to_currently_playing(db: Session, game: schemas.Game, owner_id: int):
    db_currently_playing_item = models.Currently(
        game_id=game.game_id,
        game_name=game.game_name,
        owner_id=owner_id 
    )
    
    db.add(db_currently_playing_item)
    db.commit()
    db.refresh(db_currently_playing_item)

    return db_currently_playing_item

def get_currently_playing_item(db: Session, user_id: int):
    db_currently_playing_item = db.query(models.Currently).filter(models.Currently.owner_id == user_id).all()

    if not db_currently_playing_item:
        return None
    
    return db_currently_playing_item


def delete_from_currently_playing_item(db: Session, currently_playing_item_id: int):
    db_currently_playing_item = db.query(models.Currently).filter(models.Currently.id == currently_playing_item_id).first()
    
    if db_currently_playing_item is None:
        return None
    
    db.delete(db_currently_playing_item)
    db.commit()
    return {"detail": "Wishlist item deleted successfully"}


# Finished Games ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
#]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
def add_to_wishlist(db: Session, game: schemas.Game, owner_id: int):
    db_wishlist_item = models.WishList(
        game_id=game.game_id,
        game_name=game.game_name,
        owner_id=owner_id 
    )
    
    db.add(db_wishlist_item)
    db.commit()
    db.refresh(db_wishlist_item)

    return db_wishlist_item

def get_wishlist(db: Session, user_id: int):
    wishlist_items = db.query(models.WishList).filter(models.WishList.owner_id == user_id).all()

    if not wishlist_items:
        return None
    
    return wishlist_items


def delete_from_wishlist(db: Session, wishlist_item_id: int):
    db_wishlist_item = db.query(models.WishList).filter(models.WishList.id == wishlist_item_id).first()
    
    if db_wishlist_item is None:
        return None
    
    db.delete(db_wishlist_item)
    db.commit()
    return {"detail": "Wishlist item deleted successfully"}