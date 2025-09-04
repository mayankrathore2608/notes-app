from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# db_url = "mysql+pymysql://root:test@localhost:3306/db_cn"
db_url = "sqlite:///./test.db"
engine = create_engine(db_url)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
