from sqlalchemy.orm import Session

from . import schemas
from sql_app import models

def add_to_platform(db: Session, platform_name: str, added_game_id: int):

    my_platform = models.Platforms(platform_name=platform_name, added_game_id=added_game_id)

    db.add(my_platform)
    db.commit()
    db.refresh(my_platform)
    return my_platform

def delete_platform(db: Session, platform_name: str, added_game_id: int):

    my_platform = db.query(models.Platforms).join(models.Added).filter(
        models.Added.id == added_game_id,
        models.Platforms.platform_name == platform_name
    )

    db.delete(my_platform)
    db.commit
    return {"detail": "Platform deleted succesfully"}

def delete_all_platforms_from_game(db: Session, added_game_id: int):
    rows_deleted = db.query(models.Platforms).filter(models.Platforms.added_game_id == added_game_id).delete(synchronize_session=False)
    db.commit()
    
    return {"detail": f"{rows_deleted} platform entries deleted successfully."}