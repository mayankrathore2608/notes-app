from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Notes(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    data = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
