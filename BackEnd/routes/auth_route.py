from flask import Blueprint, request, jsonify
from utils import db
from models import user
from utils import create_token
auth_bp=Blueprint('auth',__name__)


auth_bp.route('/register',methods=['GET'])
def register():
    data=request.get_json()
    username=data.get('username')   
    password=data.get('password')
    if not username or not password:
        return jsonify({'message':'Invalid data!'})
    else:
        new_user=user(username=username,password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':'User added successfully!'})

auth_bp.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    username=data.get('username')
    password=data.get('password')
    if not username or not password:
        return jsonify({'message':'Invalid data!'})
    else:
        user_data=user.query.filter_by(username=username).first()
        if user_data:
            if user_data.password==password:
                token=create_token(username)
                return jsonify({'message':'Login successful!','token':token})
            else:
                return jsonify({'message':'Invalid password!'})
        else:
            return jsonify({'message':'User not found!'})



