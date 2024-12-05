from database import Base, engine
from models import Users, MyGames, WishList, Currently, Finished

def create_tables():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")

def drop_tables():
    print("Dropping tables...")
    Base.metadata.drop_all(bind=engine)
    print("Tables dropped.")

def main():
    drop_tables()
    # create_tables()

if __name__ == "__main__":
    main()

# import database
# import models


# def create_tables():
#     print("Creating tables...")
#     database.Base.metadata.create_all(bind=database.engine)
#     print("Tables created.")

# def drop_tables():
#     print("Dropping tables...")
#     database.Base.metadata.drop_all(bind=database.engine)
#     print("Tables dropped.")

# def main():
#     drop_tables()
#     create_tables()

# if __name__ == "__main__":
#     main()