from sqlalchemy import(
    Column,
    Integer,
    String,
    ForeignKey,
    func
)
from sqlalchemy.types import(
    Date,
    Boolean,
    Time,
    DateTime,
    Text
)
from core.database import Base
from datetime import datetime
from model.base import ModelBase



class Recipe(ModelBase, Base):
    __tablename__ = "recipe"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    description = Column(String(255))
    source_id = Column(Integer, ForeignKey("source.id"))
    url = Column(String(255))
    tempo_preparo = Column(String(255))
    ingredientes = Column(Text(5000))
    categoria = Column(String(255))
    date_created = Column(DateTime, default=datetime.utcnow())


    @classmethod
    def add(cls, session, description, source_id, url, tempo_preparo, categoria, ingredientes):
        recipe = Recipe()
        recipe.description = description
        recipe.source_id = source_id
        recipe.url = url
        recipe.tempo_preparo = tempo_preparo
        recipe.ingredientes = ingredientes
        recipe.categoria = categoria
        session.add(recipe)
        session.commit()
        session.refresh(recipe)
        return Recipe.find_by_id(session=session, id=recipe.id)


    @classmethod
    def count_by_ingredients(cls, session, ingredients):
        query = session.query(func.count(cls.id))
        for item in ingredients:
            like = f'%{item}%'
            query = query.filter(Recipe.ingredientes.like(like))
        print(query.statement.compile())
        return query.scalar()


    @classmethod
    def find_by_ingredients(cls, session, ingredients, start=0):
        query = session.query(cls)
        for item in ingredients:
            like = f'%{item}%'
            query = query.filter(Recipe.ingredientes.like(like))
        query = query.limit(10).offset(start)
        print(query.statement.compile())
        return query.all()
