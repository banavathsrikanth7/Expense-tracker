from xmlrpc.client import DateTime
from sqlalchemy import Column, Integer, String,ForeignKey,Datetime
from database import engine
from sqlalchemy.orm import declarative_base,relationship
from datetime import datetime
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

Base.metadata.create_all(bind=engine)
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Integer)
    category = Column(String)
    description = Column(String)
    type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
Base.metadata.create_all(bind=engine)    