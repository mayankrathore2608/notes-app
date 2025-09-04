from sqlalchemy import MetaData, Table, Column, Integer

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("id", Integer, primary_key=True),
    Column("email", Integer, nullable=False,unique=True),
)
