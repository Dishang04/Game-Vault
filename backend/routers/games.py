from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated, List

from sqlalchemy.orm import Session
from sql_app.database import get_db
from sql_app.cruds import schemas, games_crud, platform_crud, user_crud

from authentication import HTTPException

router = APIRouter()

def check_all_deleted(db: Session, game: schemas.Game):
    if games_crud.check_all_deleted(db=db, game_id=game.game_id, user_id=game.user_id):               # that means it is deleted from all lists
            added_game = games_crud.get_added_game_info(db=db, game=game)

            platform_crud.delete_all_platforms_from_game(added_game.added_game_id)                    # deletes unused platforms and added games accordingly
            games_crud.delete_added_game(db=db, added_game_id=added_game.id)

# Add 

@router.post("/addmygame")
async def add_my_game(newgame: schemas.NewGame, db: Session = Depends(get_db)):
    game = schemas.Game(
        # platforms= [],
        user_id= newgame.user_id,
        game_id= newgame.game_id,
        # platform_name= ""
    )

    exists = games_crud.game_exists(db=db, game=game)
    game_added = False
    print("Exists: %s", exists)
    if not exists:
        game_added = games_crud.add_game(db=db, game=game)

    print("game_added: %s", game_added)

    if game_added:
        print("added game to mygames")
        return {"message": f"Succesfully added!"}

    
    else:
        raise HTTPException(status_code=403, detail="Game could not be added")
        



@router.post("/addwishlist")
def add_to_wishlist(newgame: schemas.NewGame, db: Session = Depends(get_db)):
    game = schemas.Game(
        platforms= [],
        user_id= newgame.user_id,
        game_id= newgame.game_id
    )
    print("test1")
    exists = games_crud.game_already_in_wishlist(db=db, game=game)
    print("test3")
    game_added = False
    print("Exists: %s", exists)
    if not exists:
        game_added = games_crud.add_to_wishlist(db=db, game=game)

    print("game_added: %s", game_added)

    if game_added:
        print("added game to mygames")
        return {"message": f"Succesfully added!"}
    # game_existing = games_crud.find_wishlist_game(db=db, game_id=game.game_id, user_id=newgame.user_id)
    # game_in_my_games = games_crud.find_my_game(db=db, game_id=game.game_id, user_id=game.user_id)

    # if game_existing:
    #     raise HTTPException(status_code=403, detail="Game already in Wishlist")
    
    # if game_in_my_games:
    #     raise HTTPException(status_code=403, detail="Game already in My Games")

    # added_game = games_crud.check_if_added(db=db, game=game)
    # games_crud.add_to_wishlist(db=db, game=added_game)
    
@router.post("/addcurrently")
def add_to_currently(newgame: schemas.NewGame, db: Session = Depends(get_db)):
    game = schemas.Game(
        # platforms= [],
        user_id= newgame.user_id,
        game_id= newgame.game_id
    )
    print("test1")
    exists = games_crud.game_already_playing(db=db, game=game)
    print("test3")
    game_added = False
    print("Exists: %s", exists)
    if not exists:
        game_added = games_crud.add_to_currently_playing(db=db, game=game)

    print("game_added: %s", game_added)

    if game_added:
        print("added game to mygames")
        return {"message": f"Succesfully added!"}

    
    else:
        raise HTTPException(status_code=403, detail="Game could not be added")

    # game_existing = games_crud.find_currently_playing_game(db=db, game_id=game.game_id, user_id=game.user_id)

    # if game_existing:
    #     raise HTTPException(status_code=403, detail="Game already in Wishlist")

    # added_game = games_crud.check_if_added(db=db, game=game)
    # games_crud.add_to_currently_playing(db=db, game=added_game)

@router.post("/addfinished")
def add_to_finished(newgame: schemas.NewGame, db: Session = Depends(get_db)):
    game = schemas.Game(
        platforms= [],
        user_id= newgame.user_id,
        game_id= newgame.game_id
    )
    print("test1")
    exists = games_crud.game_already_played(db=db, game=game)
    print("test3")
    game_added = False
    print("Exists: %s", exists)
    print("go to add finished")
    if not exists:
        game_added = games_crud.add_to_finished(db=db, game=game)

    print("game_added: %s", game_added)

    if game_added:
        print("added game to mygames")
        return {"message": f"Succesfully added!"}

    
    else:
        raise HTTPException(status_code=403, detail="Game could not be added")
    # game_existing = games_crud.find_finished_game(db=db, game_id=game.game_id, user_id=game.user_id)
    
    # if game_existing:
    #     raise HTTPException(status_code=403, detail="Game already in Finished")

    # added_game = games_crud.check_if_added(db=db, game=game)
    # games_crud.add_to_finished(db=db, game=added_game)

@router.post("/addplatform")
def add_platform(game: schemas.Game, db: Session = Depends(get_db)):
    platform_name = game.platform_name
    added_game = games_crud.check_if_added(db=db, game=game)
    platform_crud.add_to_platform(db=db, platform_name=platform_name, added_game_id=added_game.id)
    

# Delete

@router.delete("/deletefrommygames")
async def delete_from_my_games(game: schemas.Game, db: Session = Depends(get_db)):
    my_game = games_crud.find_my_game(db=db, game_id=game.game_id, user_id=game.user_id)

    if my_game is None:
        raise HTTPException(status_code=407, detail="Could not be found")

    deleted = games_crud.delete_from_my_games(db=db, my_game_id=game.game_id, user_id=game.user_id)
    check_all_deleted(db=db, game=game)

    if deleted: 
        return {"message": "Deleted from My Games successfully"} 

    raise HTTPException(status_code=407, detail="Could not be deleted")

@router.delete("/deletefromwishlist")
async def delete_from_wishlist(game: schemas.Game, db: Session = Depends(get_db)):
    my_game = games_crud.find_wishlist_game(db=db,game_id=game.game_id, user_id=game.user_id)

    if my_game is None:
        raise HTTPException(status_code=407, detail="Could not be found")

    deleted = games_crud.delete_from_wishlist(db=db, wishlist_game_id=game.game_id, user_id=game.user_id)
    check_all_deleted(db=db, game=game)

    if deleted:
        return {"message": "Deleted from Wishlist successfully"}
    
    raise HTTPException(status_code=407, detail="Could not be deleted")

@router.delete("/deletefromcurrently")
async def delete_from_currently(game: schemas.Game, db: Session = Depends(get_db)):
    my_game = games_crud.find_currently_playing_game(db=db, game_id=game.game_id, user_id=game.user_id)

    if my_game is None:
        raise HTTPException(status_code=407, detail="Could not be found")

    deleted = games_crud.delete_from_currently_playing(db=db, currently_playing_game_id=game.game_id, user_id=game.user_id)
    check_all_deleted(db=db, game=game)

    if deleted:
        return {"message": "Deleted from Wishlist successfully"}
    
    raise HTTPException(status_code=407, detail="Could not be deleted")


@router.delete("/deletefromfinished")
async def delete_from_wishlist(game: schemas.Game, db: Session = Depends(get_db)):
    my_game = games_crud.find_finished_game(db=db, game_id=game.game_id, user_id=game.user_id)

    if my_game is None:
        raise HTTPException(status_code=407, detail="Could not be found")

    deleted = games_crud.delete_from_finished(db=db, finished_gameid=game.game_id, user_id=game.user_id)
    check_all_deleted(db=db, game=game)

    if deleted:
        return {"message": "Deleted from Wishlist successfully"}
    

    raise HTTPException(status_code=407, detail="Could not be deleted")

@router.delete("/deleteplatform")
async def delete_platform(game: schemas.Game, db: Session = Depends(get_db)):
    added_game = games_crud.get_added_game_info(db=db, game=game)
    platform_crud.delete_platform(db=db, platform_name=game.platform_name, added_game_id=added_game.id)

# Get

@router.post("/mygames", response_model=List[schemas.ReturnGame])
async def get_my_games(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    current_user = user_crud.get_user_by_email(db=db, email=email_request.email)
    print(current_user.id)

    my_games = games_crud.get_my_games(db=db, user_id=current_user.id)
    print("succesfully gotten games")
    print(my_games)
    
    print(my_games[0].id, my_games[0].owner_id, len(my_games))
    print(my_games[-1].game_id)
    print([schemas.ReturnGame.from_orm(game) for game in my_games])
    return [schemas.ReturnGame.from_orm(game) for game in my_games]


@router.post("/mycurrent", response_model=List[schemas.ReturnGame])
async def get_currently_playing(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    print("test get user")
    current_user = user_crud.get_user_by_email(db=db, email=email_request.email)
    print("current_user %s", current_user)
    my_current = games_crud.get_currently_playing(db=db, user_id=current_user.id)
    print(my_current)
    print("test get my current and user")
    # return my_current
    print(my_current[0].id, len(my_current))
    print(my_current[-1].added_game_id)
    print([schemas.ReturnGame.from_orm(game) for game in my_current])
    print("schemas test1")
    return [schemas.ReturnGame.from_orm(game) for game in my_current]

@router.post("/myfinished", response_model=schemas.Game)
async def get_finished(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    print("test get user")
    current_user = user_crud.get_user_by_email(db=db, email=email_request.email)
    print("finished_user %s", current_user)
    my_finished = games_crud.get_finished(db=db, user_id=current_user.id)
    print(my_finished)
    print("test get my current and user")
    print(my_finished[0].id, len(my_finished))
    print(my_finished[-1].added_game_id)
    print([schemas.ReturnGame.from_orm(game) for game in my_finished])
    print("schemas test1")
    # return my_finished
    return [schemas.ReturnGame.from_orm(game) for game in my_finished]

@router.post("/mywishlist", response_model=schemas.Game)
async def get_wishlist(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    print("test wishlist")
    current_user = user_crud.get_user_by_email(db=db, email=email_request.email)
    my_wishlist = games_crud.get_wishlist(db=db, user_id=current_user.id)
    # return my_wishlist
    return [schemas.ReturnGame.from_orm(game) for game in my_wishlist]

