from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import projection.projection as proj
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine,Column, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin

app = Flask(__name__)
# app.run(debug=True)
CORS(app)
database_name = 'plantProject'
database_path = 'postgresql://aycgyrxpckuygo:4e1b6e1498d17fb884e5634b22e165b14a308ea9715e98d21dfad1baef48bdf3@ec2-44-213-151-75.compute-1.amazonaws.com:5432/dbjk60t9nksrta'


app.config['SQLALCHEMY_DATABASE_URI'] = database_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    level = Column(Integer, default=0)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    listing_ids = db.Column(db.ARRAY(Integer), nullable=True, default=[])
    
class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type_id = db.Column(db.Integer, db.ForeignKey('plant_types.id'))
    inventory = db.Column(db.Integer, nullable=False)

#I have to make the plant types this isn'taccessible to users.
    #Use the data from the data model to make the plant types
class PlantType(db.Model):
    __tablename__ = 'plant_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

# Use the app context to create the tables
with app.app_context():
    db.create_all()

# @app.route('/', methods=['GET'])
# def home():
#     data = {
#         "Name": "Mulero Alamou",
#         "Country": "Nigeria",
#         "City": "Lagos",
#         "Plant": proj.predict_crop(2, 28, 28)[0]
#     }
#     return jsonify(data)


@app.route('/register', methods=['POST'])
@cross_origin()
def create_user():
	data = request.get_json()
	print(data)

# Validate and create a new User instance
	new_user = User(
		first_name=data.get('first_name'),
		last_name=data.get('last_name'),
		address=data.get('address'),
		level=0,
		email=data.get('email'),
		password=data.get('password')
	)

	try:
		db.session.add(new_user)
		db.session.commit()
		return jsonify({'message': 'User created successfully', 'user_id': new_user.id})
	except IntegrityError:
		db.session.rollback()
		return jsonify({'error': 'Email already exists'}), 400
	finally:
		db.session.close()

@app.route('/login', methods=['POST'])
def login_user():
	data = request.get_json()
	user = User.query.filter_by(email=data.get('email')).first()
     
	

	if user and user.password == data.get('password'):
		return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'level': user.level}})
	else:
		return jsonify({'error': 'Invalid email or password'}), 400
     
@app.route('/listings', methods=['GET'])
def get_listings():
# Query all listings from the database
    all_listings = Listing.query.all()

    # Serialize the listings to a format that can be JSON-serialized
    serialized_listings = [
        {
            'id': listing.id,
            'name': listing.name,
            'description': listing.description,
            'price': listing.price,
            'created_at': listing.created_at.isoformat(),  # Convert to string for JSON serialization
            'user_id': listing.user_id,
            'type_id': listing.type_id
            # Add other listing attributes as needed
        }
        for listing in all_listings
    ]

    return jsonify({'listings': serialized_listings})

@app.route('/listings/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
	listing = Listing.query.filter_by(id=listing_id).first()
	if listing is None:
		abort(404, 'Listing not found')

	user = User.query.filter_by(id=listing.user_id).first()
	currUser= {
		'id': user.id,
		'first_name': user.first_name,
		'last_name': user.last_name,
		'email': user.email,
		'level': user.level
	}

	type = PlantType.query.filter_by(id=listing.type_id).first()
	currType = {
		'id': type.id,
		'name': type.name,
	}

	return jsonify({
		'id': listing.id,
		'name': listing.name,
		'description': listing.description,
		'price': listing.price,
		'created_at': listing.created_at.isoformat(),  # Convert to string for JSON serialization
		'user_id': currUser,
		'type_id': currType
		# Add other listing attributes as needed
	})

@app.route('/my-listings/<int:user_id>', methods=['GET'])
def get_my_listings(user_id):
	user = User.query.filter_by(id=user_id).first()
	if user is None:
		abort(404, 'User not found')

	listings = Listing.query.filter(Listing.user_id == user_id).all()
	serialized_listings = [
		{
			'id': listing.id,
			'name': listing.name,
			'description': listing.description,
			'price': listing.price,
			'created_at': listing.created_at.isoformat(),  # Convert to string for JSON serialization
			'user_id': listing.user_id,
			'type_id': listing.type_id
			# Add other listing attributes as needed
		}
		for listing in listings
	]

	return jsonify({'listings': serialized_listings})

@app.route('/listings', methods=['POST'])
def create_listing():


	user = User.query.filter_by(id=request.get_json().get('user_id')).first()
	data = request.get_json()
    #Check if the user is a farmer before creating a listing
	print(data)
	if data.get('level') != 1:
		abort(403, 'User is not a farmer')

	new_listing = Listing(
		name=data.get('name'),
		description=data.get('description'),
        inventory=data.get('inventory'),
        #Ask user to enter the price per pound in the front end
		price=data.get('price'),
        #The user ID will be retrieved from the session so remember to implement that
		user_id=data.get('user_id'),
		type_id=data.get('type_id')
	)
     
	db.session.add(new_listing)
	db.session.commit()
     
	# Fetch the user
	db.session.query(User).filter(User.id == data.get('user_id')).update(
        {User.listing_ids: User.listing_ids + [new_listing.id]}
    )

    # Commit the changes to the user
	db.session.commit()

	return jsonify({'message': 'Listing created successfully', 'listing_id': new_listing.id})

@app.route('/becomeFarmer/<int:user_id>', methods=['PATCH'])
def become_farmer(user_id):
	user = db.session.query(User).filter(User.id == user_id).first()
      
	if user.level == 1:
		abort(403, 'User is already a farmer')
            
	user.level = 1
	db.session.commit()
	return jsonify({'message': 'User is now a farmer'})

@app.route('/plant-types', methods=['GET'])
def get_plant_types():
	plant_types = PlantType.query.all()
	return jsonify([plant_type.serialize() for plant_type in plant_types])

@app.route('/forecast', methods=['POST'])
def forecast():
	# user =  User.query.filter_by(id=request.get_json().get('user_id')).first()
	# if user.level != 1:
	# 	abort(403, 'User is not a farmer')
	
	data = request.get_json()
	temperature = data.get('temperature')
	humidity = data.get('humidity')
	ph = data.get('ph')
	rainfall = data.get('rainfall')
	N = data.get('N')
	P = data.get('P')
	K = data.get('K')

	# Make a prediction
	prediction_result = proj.predict_crop(ph, temperature, humidity, rainfall, N, P, K)
	crop = prediction_result

	return jsonify({'crop': crop})

# @app.route('/get_user/<user_id>', methods=['GET'])
# def get_user(user_id):
#     user = User.objects.get_or_404(id=user_id)
#     return jsonify({'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'created_at': user.created_at.isoformat()})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
