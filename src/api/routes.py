from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.utils import APIException
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Ruta de Registro
@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")

    # Verificar si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "El usuario ya está registrado"}), 400

    # Crear un nuevo usuario con el password hasheado
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado exitosamente"}), 201

# Ruta de Inicio de Sesión
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    # Verificar si el usuario existe
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    # Generar token JWT
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token}), 200

# Ruta Protegida para Validar Token
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"msg": f"Usuario autenticado: {user.email}"}), 200
