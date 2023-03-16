"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException
"""
This module takes care of JWT
"""
# create_access_token(), para crear JSON Web Tokens
# jwt_required(), para proteger rutas
# get_jwt_identity(), para obtener la identidad de JWT en una ruta protegida
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

import json, bcrypt

api = Blueprint('api', __name__)

# Ruta para el registro de un Usuario
@api.route('/userRegister', methods=['POST'])
def registration():
    # Recibimos los datos del Front
    body = json.loads(request.data)

    print(body)

    user = User.query.filter_by(email=body["email"]).first()

    # if(user.email.length == 0 ):
    #     return jsonify({"msg": "El email ya esta registrado"}), 401 

    # # Hash password
    # hashed_password = current_app.bcrypt.generate_password_hash(
    #     body["password"]
    # ).decode("utf-8")

    # # Guardar nuevo user con hashed_password
    # body = {
    #     x: body[x]
    #     for x in [
    #         "email",
    #         "password",
    #     ]
    # }

    # body["password"] = hashed_password

    # user = User(**body)

    # db.session.add(user)
    # db.session.commit()

    response_body = {
        "message": "Formulario de Registro Usuario Ok"
    }

    return jsonify(response_body), 200

# Ruta para realizar Login de un usuario
@api.route('/login', methods=['POST'])
def login():
    # almacenamos la solicitud JSON obtenida de email y password
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # almacenamos la primera coincidencia de email en User
    user = User.query.filter_by(email=email).first()

    # Comprobamos si existe el Usuario
    if user is None:
        return jsonify({"msg": "User does not exist"}), 404
        
    # Si el email o password no coindicen retornamos error de autentificacion
    if email != user.email or not current_app.bcrypt.check_password_hash(
        user.password, password
    ):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = {
        "token": create_access_token(identity=email),
        "user_info": {
            "email": user.email,
        },
    }

    # retornamos el objeto Response devuelto por jsonify con la
    # configuracion mimetype application/json
    return jsonify(access_token)    