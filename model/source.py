from sqlalchemy import(
    Column,
    Integer,
    String,
    ForeignKey
)
from sqlalchemy.types import(
    Date,
    Boolean,
    Time,
    DateTime
)
from core.database import Base

from model.base import ModelBase
from datetime import datetime


class Source(ModelBase, Base):
    __tablename__ = "source"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    description = Column(String(255))
    key = Column(String(255))
    date_created = Column(DateTime, default=datetime.utcnow())


    @classmethod
    def add(cls, session, description, key):
        source = Source()
        source.description = description
        source.key = key
        session.add(source)
        session.commit()
        session.refresh(source)
        return Source.find_by_id(session=session, id=source.id)


    @classmethod
    def find_by_key(cls, session, key):
        return session.query(
            cls.id,
            cls.description,
            cls.key,
            cls.date_created
        ).filter_by(key=key).first()
    