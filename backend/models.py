# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import create_engine,Column, Integer, String
# from datetime import datetime
# from __main__ import app


# db = SQLAlchemy(app)

# class User(db.Model):
#     __tablename__ = 'users' 
#     id = Column(Integer, primary_key=True)
#     first_name = Column(String, nullable=False)
#     last_name = Column(String, nullable=False)
#     address = Column(String, nullable=False)
#     level = Column(Integer, default=0)
#     email = Column(String, unique=True, nullable=False)
#     password = Column(String, nullable=False)
#     listing_ids = db.Column(db.ARRAY(Integer), nullable=True, default=[])
#     # order_ids = db.Column(db.ARRAY(Integer), nullable=True, default=[])
#     # cart_ids = db.Column(db.ARRAY(Integer), nullable=True, default=[])
        
# class Listing(db.Model):
#     __tablename__ = 'listings'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.String, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     type_id = db.Column(db.Integer, db.ForeignKey('plant_types.id'))
#     inventory = db.Column(db.Integer, nullable=False)

# #I have to make the plant types this isn'taccessible to users.
#     #Use the data from the data model to make the plant types
# class PlantType(db.Model):
#     __tablename__ = 'plant_types'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.String, nullable=False)

# class Order(db.Model):
#     __tablename__ = 'orders'

#     id = db.Column(db.Integer, primary_key=True)
#     buyer_id = db.Column(db.Integer,  nullable=False)
#     seller_id = db.Column(db.Integer, nullable=False)
#     listing_id = db.Column(db.Integer, nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.ut)
#     fulfilled = db.Column(db.Boolean, default=False)
    
# # Use the app context to create the tables
# with app.app_context():
#     db.create_all()